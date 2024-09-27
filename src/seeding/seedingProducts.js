import { db } from "@/config/firebase.config";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";
import { productsData } from "./productsData";

export const SeedingProducts = async () => {
  // Referensi ke koleksi Produk di Firestore
  const productsRef = collection(db, "Produk");

  // Batch operation untuk mempercepat proses
  const batch = writeBatch(db);

  productsData.forEach((product) => {
    const docRef = doc(productsRef); // Buat doc baru di Firestore
    batch.set(docRef, product); // Tambahkan produk ke batch
  });

  // Commit batch untuk menambahkan semua produk sekaligus
  try {
    await batch.commit();
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
