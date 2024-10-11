import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export default function InputCombobox({ data = [], field, onChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-input bg-background text-black text-opacity-60"
        >
          {value
            ? data.find((item) => item.name === value)?.name
            : `Pilih ${field}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit h-[225px] p-0">
        <Command>
          <CommandInput placeholder={`Cari ${field}...`} />
          <CommandList>
            <CommandEmpty>{field} tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const selectedValue =
                      currentValue === value ? "" : currentValue;
                    setValue(selectedValue);
                    setOpen(false);
                    onChange(selectedValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
