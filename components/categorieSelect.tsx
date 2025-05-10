import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Categorie {
  id: string;
  nomCategorie: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  categories: Categorie[];
}

export function CategorieSelect({ value, onChange, categories }: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = categories.find((cat) => cat.id === value)?.nomCategorie ?? "Sélectionner une catégorie";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {selectedLabel}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher..." className="h-9" />
          <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
          <CommandGroup>
            {categories.map((cat) => (
              <CommandItem
                key={cat.id}
                onSelect={(text) => {
                  const selected = categories.find(
                    (c) => c.nomCategorie.toLowerCase() === text.toLowerCase()
                  );
                  if (selected) {
                    onChange(selected.id);
                    setOpen(false);
                  }
                }}
              >
                {cat.nomCategorie}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === cat.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
