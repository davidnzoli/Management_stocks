"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  // SelectViewport,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategorieSelect } from "./categorieSelect";
import { SelectViewport } from "@radix-ui/react-select";

interface Categorie {
  id: string;
  nomCategorie: string;
}

interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddProduit({ onClosed }: AddDataDialogContent) {
  const [categories, setCategories] = React.useState<Categorie[]>([]);
  const [formData, setFormData] = React.useState({
    nomProduit: "",
    description: "",
    prix: "",
    quantite: "",
    categorie: "",
    codeBarre: "",
  });

  async function fetchCategories() {
    try {
      const res = await fetch("/api/products");
      const result = await res.json();
      console.log("Réponse brute : ", result);

      if (!result || !Array.isArray(result.data)) {
        console.error("Structure inattendue:", result);
        setCategories([]);
        return;
      }

      setCategories(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      setCategories([]);
    }
  }
  React.useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categorie) {
      toast.error("Veuillez sélectionner une catégorie.");
      return;
    }
    try {
      const res = await fetch("/api/products2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de l'ajout de produit");
      }

      setFormData({
        nomProduit: "",
        description: "",
        prix: "",
        quantite: "",
        categorie: "",
        codeBarre: "",
      });
      onClosed();
      toast.success("Produit ajouté avec succès ✅");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error("Échec de l'ajout du produit ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un Produit</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter un produit.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="nomProduit">Nom du produit</Label>
          <Input
            id="nomProduit"
            name="nomProduit"
            value={formData.nomProduit}
            onChange={handleChange}
            placeholder="Ex: Bouteille d'eau"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prix">Prix</Label>
          <Input
            id="prix"
            name="prix"
            type="number"
            value={formData.prix}
            onChange={handleChange}
            placeholder="Ex: 2500"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="quantite">Quantité</Label>
          <Input
            id="quantite"
            name="quantite"
            type="number"
            value={formData.quantite}
            onChange={handleChange}
            placeholder="Ex: 10"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Détails sur le produit"
            required
          />
        </div>

        <div className="grid gap-2">
          <Select
            value={formData.categorie}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, categorie: val }))
            }
          >
            <SelectTrigger id="categorie" className="w-full">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.nomCategorie}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="codeBarre">Code barre</Label>
          <Input
            id="codeBarre"
            name="codeBarre"
            value={formData.codeBarre}
            onChange={handleChange}
            placeholder="Ex: 123456789012"
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onClosed}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
