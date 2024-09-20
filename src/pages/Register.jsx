import logo from "@/assets/images/logo.svg";
import illustration from "@/assets/images/illustration-1.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function RegisterPage() {
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
          <form className="space-y-3 w-full">
            <div className="flex gap-10 justify-center">
              <div id="left-form" className="space-y-3">
                <div>
                  <Label>Nama</Label>
                  <Input />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label>Konfirmasi Password</Label>
                  <Input type="password" />
                </div>
                <div>
                  <Label htmlFor="option-one">Gender</Label>
                  <RadioGroup defaultValue="option-one" className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Laki-laki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Perempuan</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div id="right-form" className="space-y-3">
                <div>
                  <Label>Alamat</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Kota</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Nomor HP</Label>
                  <Input type="text" />
                </div>
                <div>
                  <Label>Paypal ID</Label>
                  <Input type="text" />
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
    </main>
  );
}

export default RegisterPage;
