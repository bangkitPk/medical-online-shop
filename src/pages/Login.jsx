import logo from "@/assets/images/logo.svg";
import illustration from "@/assets/images/illustration-1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { z } from "zod"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

function LoginPage() {
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
        <div className="w-1/2  flex flex-col items-center">
          <img src={logo} className="w-14 mb-10" alt="logo" />
          <h1 className="text-3xl font-bold mb-10">Masuk ke Akun Anda</h1>

          {/* FORM LOGIN */}
          <form className="space-y-8 w-full">
            <div>
              <Label>Email</Label>
              <Input type="email" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" />
            </div>
            <Button type="submit" variant="outline" className="w-full">
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
