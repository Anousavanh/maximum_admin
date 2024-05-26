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

interface MultiSelectCollectionProps {
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (_id: string) => void;
}

const MultiSelectCollection: React.FC<MultiSelectCollectionProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const collection = [
    {
      _id: "1",
      label: "Product",
    },
    {
      _id: "2",
      label: "Product Screen",
    },
  ];

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {value.map((selectedItem) => (
          <Badge key={selectedItem}>
            {selectedItem}
            <Button
              type="button"
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(selectedItem)}
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
            {collection.map((item) => (
              <CommandItem
              key={item._id}
              onMouseDown={(e) => e.preventDefault()}
              onSelect={() => {
                onChange([...value, item.label]); // Make sure item.label is used
                setInputValue("");
              }}
              className="hover:bg-grey-2 cursor-pointer"
            >
              {item.label}
            </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelectCollection;
