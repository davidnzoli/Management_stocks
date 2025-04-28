"use client";

import * as React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddDataDialogContent {
  onClose: () => void;
}

export default function AddCategory({ onClose }: AddDataDialogContent) {
  const [formDatas, setFormDatas] = React.useState({
    nomCategorie: "",
    designationCategorie: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDatas((prev) => ({ ...prev, [name]: value }));
  };
  const handleChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDatas((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDatas),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de l'ajout de categorie");
      }

      const categorie = await res.json();
      console.log("categorie ajouté :", categorie);
      setFormDatas({ nomCategorie: "", designationCategorie: "" });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=opens]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Ajouter une Catégorie</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2 w-full">
          <Label htmlFor="categorie">Catégorie</Label>
          <Input
            id="categorie"
            name="nomCategorie"
            placeholder="Catégorie"
            type="text"
            value={formDatas.nomCategorie}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="designation">Designation</Label>
          <Textarea
            id="designation"
            name="designationCategorie"
            placeholder="Designation de cette catégorie"
            value={formDatas.designationCategorie}
            onChange={handleChanges}
            required
            className="w-full"
          />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" className="cursor-pointer">
            Enregistrer
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
