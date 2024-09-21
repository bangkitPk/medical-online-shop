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
import { formSchema } from "@/utils/formValidation";
import { z } from "zod";

function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    konfirmasiPassword: "password123",
    gender: "Laki-laki",
    alamat: "Jl. Contoh No.1",
    kota: "Surabaya",
    nomorHP: "08123456789",
    paypalID: "johndoe@paypal.com",
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const navigate = useNavigate();
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

      // tambah user jika email belum ada di database
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // pilih data user yang disimpan di database
      const storedUserData = {
        nama: formData.nama,
        email: formData.email,
        gender: formData.gender,
        alamat: formData.alamat,
        kota: formData.kota,
        nomorHP: formData.nomorHP,
        paypalID: formData.paypalID,
      };
      if (user) {
        // simpan data user
        await setDoc(doc(db, "Users", user.uid), storedUserData);
      }
      const authInfo = {
        userID: user.uid,
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
    <main className="flex w-screen h-screen relative overflow-hidden">
      <div className="bg-gradient-to-r from-secondary to-[#a0391d] w-40 h-40 rounded-full absolute z-10 -top-8 -left-10"></div>
      <div className="bg-secondary w-1/2 h-full relative flex flex-col items-center justify-center z-0">
        <div className="bg-[#ffc1ad] opacity-50 w-80 h-80 rounded-full absolute z-0 top-20"></div>

        <img
          src={illustration}
          className="relative z-10 w-8/12"
          alt="ilustrasi 1"
        />
      </div>
      <div className="bg-gradient-to-r from-secondary to-primary w-28 h-28 rounded-full absolute -bottom-16 left-1/2 -translate-x-2/3 opacity-50"></div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-3/4 flex flex-col items-center">
          <img src={logo} className="w-14 mb-5" alt="logo" />
          <h1 className="text-3xl font-bold mb-5">Daftar Akun Baru</h1>

          {/* FORM LOGIN */}
          <form className="space-y-3 w-full" onSubmit={handleSubmit}>
            <div className="flex gap-10 justify-center">
              <div id="left-form" className="space-y-3">
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
                  } animate-slide-down transition-all`}
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
                  <Label>Alamat</Label>
                  <Input
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative">
                  <Label>Kota</Label>
                  <Input
                    type="text"
                    name="kota"
                    value={formData.kota}
                    onChange={handleInputChange}
                  />
                  {/* <div
                    className={`${
                      !formData.kota && "hidden"
                    } animate-slide-up transition-all bg-gray-400 rounded-md w-full h-40 absolute overflow-scroll`}
                  >
                    {cities.results ? (
                      cities.results.map((city, index) => (
                        <p key={index}>{city.asciiname}</p>
                      ))
                    ) : (
                      <p>No cities available</p>
                    )}
                  </div> */}
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
                  <Label>Paypal ID</Label>
                  <Input
                    type="text"
                    name="paypalID"
                    value={formData.paypalID}
                    onChange={handleInputChange}
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
