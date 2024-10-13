import { z } from "zod";

export const formSchema = z
  .object({
    nama: z
      .string()
      .min(3, "Nama harus terdiri dari minimal 3 karakter")
      .regex(/\w+\s*\w*/, "Nama harus mengandung setidaknya satu kata"),
    email: z.string().email("Email tidak valid"),
    password: z
      .string()
      .min(6, "Password harus terdiri dari minimal 6 karakter"),
    konfirmasiPassword: z.string(),
    alamat: z
      .object({
        provinsi: z.string().min(3, "Provinsi tidak valid"),
        "kota-kab": z.string().min(3, "Kota/Kabupaten tidak valid"),
        detail: z
          .string()
          .min(5, "Detail alamat harus terdiri dari minimal 5 karakter"),
      })
      .refine((data) => data.provinsi && data["kota-kab"] && data.detail, {
        message: "Lengkapi semua informasi alamat",
      }),
    nomorHP: z
      .string()
      .regex(/^(\+62|62|0)8[1-9][0-9]{8,13}$/, "Nomor HP tidak valid"),
    paypalID: z.string().email("Paypal ID tidak valid"),
  })
  .refine((data) => data.password === data.konfirmasiPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["konfirmasiPassword"],
  });
