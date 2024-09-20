import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchInput() {
  return (
    <div className="flex h-10 w-1/2 items-center rounded-2xl border border-ring bg-white pl-3 text-sm ring-offset-u focus-within:ring-1 focus-within:ring-primary">
      <Search />
      <Input
        placeholder="Cari produk..."
        className="w-full h-4/5 border-0 rounded-2xl ring-offset-0 p-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
