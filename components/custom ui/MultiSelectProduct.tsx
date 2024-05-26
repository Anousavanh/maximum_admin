"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface MultiSelectProductProps {
  placeholder: string;
  products: (ProductType)[]; 
  value: string[];
  onChange: (_id: string) => void;
  onRemove: (_id: string) => void; 
}

const MultiSelectProduct: React.FC<MultiSelectProductProps> = ({
  placeholder,
  products,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected = value.map((id) =>
    products.find((item) => item && item._id === id)
  ).filter((item): item is ProductType  => !!item);
  

  const selectables = products.filter((item) => !selected.includes(item));
  

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((item) => (
          <Badge key={item._id}>
            {item.title}
            <Button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(item._id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md bg-white">
            {selectables.map((item) => (
              <CommandItem
                key={item._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(item._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelectProduct;
