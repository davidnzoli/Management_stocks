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

import { SelectViewport } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

interface UpdateCategoryProps {
  onClose: () => void;
  produitId: string;
  onUpdate: () => void;
}
interface Categorie {
  id: string;
  nomCategorie: string;
}
export default function UpdatedProduit({
  onClose,
  produitId,
  onUpdate,
}: UpdateCategoryProps) {
  const [nomProduit, setProduit] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prix, setPrix] = React.useState("");
  const [quantite, setQuantite] = React.useState("");
  const [codeBarre, setCodebarre] = React.useState("");
  const [categorieItem, setCategorieItem] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState<Categorie[]>([]);

  React.useEffect(() => {
    const fetchcategorie = async () => {
      try {
        const res = await fetch(`/api/products2/${produitId}`);
        if (!res.ok) {
          let errorData;
          try {
            errorData = await res.json();
          } catch (err) {
            errorData = { message: "Réponse vide ou invalide" };
          }
          console.error("Erreur côté serveur:", errorData);
          return;
        }

        const data = await res.json();
        console.log("Succès:", data);

        setProduit(data.nomProduit || "");
        setDescription(data.description || "");
        setPrix(data.prix || "");
        setQuantite(data.quantite || "");
        setCodebarre(data.codeBarre || "");
        setCategorieItem(data.categorieId || "");
      } catch (error) {
        console.error("Erreur lors du chargement de PRODUIT", error);
      }
    };

    if (produitId) fetchcategorie();
  }, [produitId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/products2/${produitId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomProduit,
          description,
          prix: parseFloat(prix),
          quantite: parseInt(quantite),
          codeBarre: codeBarre,
          categorieId: categorieItem,
        }),
      });
      onUpdate();
      onClose();
      toast.success("Produit modifié avec succès ✅");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

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
  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=openss]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Modifier ce Produit</DialogTitle>

        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2 w-full">
          <Label htmlFor="nomProduit">Produit</Label>
          <Input
            id="nomProduit"
            name="nomProduit"
            type="text"
            value={nomProduit}
            onChange={(e) => setProduit(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détails sur le produit"
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="prix">Prix</Label>
          <Input
            id="prix"
            name="prix"
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="qunatite">Quantite</Label>
          <Input
            id="quantite"
            name="quantite"
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="codeBarre">code Barre</Label>
          <Input
            id="codeBarre"
            name="codeBarre"
            type="text"
            value={codeBarre}
            onChange={(e) => setCodebarre(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="grid gap-2">
          <Select
            value={categorieItem}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setCategorieItem(value);
            }}
          >
            <SelectTrigger id="categorie" className="w-full">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={String(cat.id)}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.nomCategorie}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {" "}
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
