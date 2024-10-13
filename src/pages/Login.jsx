import logo from "@/assets/images/logo.svg";
import illustration from "@/assets/images/illustration-1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "@/redux/slices/authSlice";
import { clearGuestToast } from "@/redux/slices/guestSlice";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
// import { z } from "zod"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // guest toast (ketika dialihkan ke halaman login setelah menambah produk tanpa login)
  const { toast } = useToast();
  const guestToast = useSelector((state) => state.guest.guestToast);

  useEffect(() => {
    if (guestToast) {
      console.log(guestToast);
      toast(guestToast); // tampilkan pesan toast
      dispatch(clearGuestToast()); // hapus toast dari state setelah ditampilkan
    }
  }, [guestToast, dispatch, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then((userData) => {
        const authInfo = {
          userID: userData.uid,
          role: userData.role,
          isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.error("Login failed:", err));
  };

  return (
    <main className="flex max-sm:pt-10 max-sm:bg-secondary w-screen h-screen relative overflow-hidden">
      <div className="bg-gradient-to-r from-secondary to-[#a0391d] w-40 h-40 rounded-full absolute z-10 -top-8 -left-10"></div>
      <div className="bg-secondary  max-sm:hidden w-1/2 h-full relative flex flex-col items-center justify-center z-0">
        <div className="bg-[#ffc1ad] opacity-50 w-80 h-80 rounded-full absolute z-0 top-20"></div>

        <img
          src={illustration}
          className="relative z-10 w-8/12"
          alt="ilustrasi 1"
        />
      </div>
      <div className="bg-gradient-to-r from-secondary to-primary w-28 h-28 rounded-full absolute -bottom-16 left-1/2 -translate-x-2/3 opacity-50"></div>
      <div className="max-sm:w-full max-sm:z-50  w-1/2 h-full flex justify-center items-center">
        <div className="w-1/2 max-sm:w-3/4 flex flex-col items-center">
          <img src={logo} className="w-14 mb-10" alt="logo" />
          <h1 className="max-sm:text-center max-sm:text-xl text-3xl font-bold mb-10">
            Masuk ke Akun Anda
          </h1>

          {/* FORM LOGIN */}
          <form className="space-y-8 w-full" onSubmit={handleSubmit}>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <Button type="submit" variant="outline" className="w-full">
              Masuk
            </Button>
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default LoginPage;
