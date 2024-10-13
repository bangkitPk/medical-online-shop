import logo from "@/assets/images/logo.svg";
import illustration from "@/assets/images/illustration-1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { formSchema } from "@/validation/registerFormValidation";
import { z } from "zod";
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useFetchRegions } from "@/hooks/useFetchAlamat";
import InputCombobox from "@/components/input-combobox";

function RegisterPage() {
  const { provinces, cities, fetchCities, loading, error } = useFetchRegions();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
    gender: "",
    alamat: {
      provinsi: "",
      "kota-kab": "",
      detail: "",
    },
    nomorHP: "",
    paypalID: "",
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "konfirmasiPassword") {
      if (formData.password && value === formData.password) {
        setIsPasswordMatched(true);
      } else {
        setIsPasswordMatched(false);
      }
    }

    if (name === "password") {
      if (
        formData.konfirmasiPassword &&
        value === formData.konfirmasiPassword
      ) {
        setIsPasswordMatched(true);
      } else {
        setIsPasswordMatched(false);
      }
    }
  };

  const handleGenderChange = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const handleAlamatChange = (field, value) => {
    setFormData({
      ...formData,
      alamat: {
        ...formData.alamat,
        [field]: value,
      },
    });
  };

  const handleProvinsiChange = (provinceSelected) => {
    let provinceId = provinces.find(
      (provinsi) => provinsi.name === provinceSelected
    )?.id;

    handleAlamatChange("provinsi", provinceSelected);
    fetchCities(provinceId);
  };

  const handleKotaChange = (cityId) => {
    handleAlamatChange("kota-kab", cityId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // validasi form
      formSchema.parse(formData);
      // cek apakah email sudah ada di database
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({
          title: "Email Sudah Terdaftar!",
          description: "Email yang Anda Masukkan Sudah Terdaftar Dalam Sistem",
          variant: "destructive",
        });
        return;
      }

      // daftar user jika email belum ada di database
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      const storedUserData = {
        nama: formData.nama,
        email: formData.email,
        gender: formData.gender,
        alamat: formData.alamat,
        nomorHP: formData.nomorHP,
        paypalID: formData.paypalID,
        role: "customer", // set role untuk customer
      };
      if (user) {
        // simpan data user
        await setDoc(doc(db, "Users", user.uid), storedUserData);
        dispatch(setUser({ uid: user.uid, ...storedUserData })); // set user state with user data
      }

      const authInfo = {
        userID: user.uid,
        role: "customer",
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));

      toast({
        title: "Anda Berhasil Mendaftar",
        description: "Anda Akan Beralih ke Beranda",
        variant: "success",
      });
      setTimeout(() => navigate("/"), 3500);
      console.log("User registered successfully", user);
      return user;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            title: "Validasi Error",
            description: err.message,
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: "Terjadi Error Saat Pendaftaran",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <main className="flex max-sm:pt-20 max-sm:bg-secondary w-screen h-screen relative overflow-hidden max-sm:overflow-y-auto">
      <div className="bg-gradient-to-r from-secondary to-[#a0391d] w-40 h-40 rounded-full absolute z-10 -top-8 -left-10"></div>
      <div className="bg-secondary max-sm:hidden w-1/2 h-full relative flex flex-col items-center justify-center z-0">
        <div className="bg-[#ffc1ad] opacity-50 w-80 h-80 rounded-full absolute z-0 top-20"></div>

        <img
          src={illustration}
          className="relative z-10 w-8/12"
          alt="ilustrasi 1"
        />
      </div>
      <div className="bg-gradient-to-r from-secondary to-primary w-28 h-28 rounded-full absolute -bottom-16 left-1/2 -translate-x-2/3 opacity-50"></div>
      <div className="max-sm:w-full max-sm:z-50  w-1/2 h-full flex justify-center items-center">
        <div className="w-3/4 flex flex-col items-center">
          <img src={logo} className="w-14 mb-5" alt="logo" />
          <h1 className="text-3xl font-bold mb-5">Daftar Akun Baru</h1>

          {/* FORM LOGIN */}
          <form className="space-y-3 w-full" onSubmit={handleSubmit}>
            <div className="flex max-sm:flex-col max-sm:gap-3 gap-10 justify-center">
              <div id="left-form" className="space-y-3 w-1/2 max-sm:w-full">
                <div>
                  <Label>Nama</Label>
                  <Input
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div
                  className={`${
                    !formData.password && "hidden"
                  } animate-scale-right`}
                >
                  <Label
                    className={`flex items-center mb-1 gap-1 text-destructive ${
                      isPasswordMatched && "text-green-700"
                    }`}
                  >
                    <span>Konfirmasi Password</span>
                    {isPasswordMatched ? (
                      <CircleCheck size={16} />
                    ) : (
                      <CircleX size={16} />
                    )}
                  </Label>
                  <Input
                    type="password"
                    name="konfirmasiPassword"
                    value={formData.konfirmasiPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Nomor HP</Label>
                  <Input
                    type="text"
                    name="nomorHP"
                    value={formData.nomorHP}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="option-one">Gender</Label>
                  <RadioGroup
                    defaultValue="option-one"
                    className="flex"
                    value={formData.gender}
                    onValueChange={handleGenderChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Laki-laki" id="option-one" />
                      <Label htmlFor="option-one">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Perempuan" id="option-two" />
                      <Label htmlFor="option-two">Perempuan</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div id="right-form" className="space-y-3">
                <div>
                  <Label>Alamat (Provinsi)</Label>
                  <InputCombobox
                    data={provinces}
                    field="Provinsi"
                    onChange={handleProvinsiChange}
                  />
                </div>
                <div>
                  <Label>Alamat (Kota)</Label>
                  <InputCombobox
                    data={cities}
                    field="Kabupaten/Kota"
                    onChange={handleKotaChange}
                  />
                </div>
                <div>
                  <Label>Detail Alamat (Jalan/Gang/Desa, dll.)</Label>
                  <Input
                    type="text"
                    id="detail"
                    name="detail"
                    value={formData.alamat.detail}
                    onChange={(e) =>
                      handleAlamatChange("detail", e.target.value)
                    }
                    required
                    className="w-[200px] max-sm:w-full"
                  />
                </div>
                <div>
                  <Label>Paypal ID</Label>
                  <Input
                    type="text"
                    name="paypalID"
                    value={formData.paypalID}
                    onChange={handleInputChange}
                    className="w-[200px] max-sm:w-full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit" variant="outline" className="w-3/4">
                Daftar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default RegisterPage;
