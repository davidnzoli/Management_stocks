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
  categoryId: string;
  onUpdate: () => void;
}

export default function UpdatedCategory({
  onClose,
  categoryId,
  onUpdate,
}: UpdateCategoryProps) {
  const [nomCategorie, setCategorie] = React.useState("");
  const [designationCategorie, setDesignation] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchcategorie = async () => {
      try {
        const res = await fetch(`/api/products/${categoryId}`);
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

        // Vérifier si les valeurs existent avant de les mettre à jour
        setCategorie(data.nomCategorie || ""); // Valeur par défaut si undefined
        setDesignation(data.designationCategorie || ""); // Valeur par défaut si undefined
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur", error);
      }
    };

    if (categoryId) fetchcategorie();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/products/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomCategorie,
          designationCategorie,
        }),
      });
      onUpdate();
      onClose();
      toast.success("Catégorie modifié avec succès ✅");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=openss]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Modifier cette catégorie</DialogTitle>

        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2 w-full">
          <Label htmlFor="nomCategorie">Catégorie</Label>
          <Input
            id="nomCategorie"
            name="nomCategorie"
            type="text"
            value={nomCategorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="designationCategorie">Designation</Label>
          <Textarea
            id="designationCategorie"
            name="designationCategorie"
            value={designationCategorie}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="w-full"
          />
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

// "use client";

// import * as React from "react";
// import { toast } from "sonner";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "./ui/textarea";

// interface UpdateCategoryProps {
//   onClose: () => void;
//   categoryId: string;
//   onUpdate: () => void;
// }

// export default function UpdatedCategory({
//   onClose,
//   categoryId,
//   onUpdate,
// }: UpdateCategoryProps) {
//   const [nomCategorie, setCategorie] = React.useState("");
//   const [designationCategorie, setDesignation] = React.useState("");
//   const [loading, setLoading] = React.useState(false);

//   React.useEffect(() => {
//     const fetchcategorie = async () => {
//       try {
//         const res = await fetch(`/api/products/${categoryId}`);
//         if (!res.ok) {
//           let errorData;
//           try {
//             errorData = await res.json();
//           } catch (err) {
//             errorData = { message: "Réponse vide ou invalide" };
//           }
//           console.error("Erreur côté serveur:", errorData);
//           return;
//         }

//         const data = await res.json();
//         console.log("Succès:", data);

//         // Vérifier si les valeurs existent avant de les mettre à jour
//         setCategorie(data.nomCategorie || ""); // Valeur par défaut si undefined
//         setDesignation(data.designationCategorie || ""); // Valeur par défaut si undefined
//       } catch (error) {
//         console.error("Erreur lors du chargement de l'utilisateur", error);
//       }
//     };

//     if (categoryId) fetchcategorie();
//   }, [categoryId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await fetch(`/api/products/${categoryId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           nomCategorie,
//           designationCategorie,
//         }),
//       });
//       onUpdate();
//       onClose();
//       toast.success("Catégorie modifié avec succès ✅");
//     } catch (error) {
//       console.error("Erreur de mise à jour :", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <DialogContent className="animate-in duration-200 ease-out data-[state=openss]:fade-in data-[state=closed]:fade-out">
//       <DialogHeader>
//         <DialogTitle>Modifier cette catégorie</DialogTitle>

//         <DialogDescription>
//           Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
//         </DialogDescription>
//       </DialogHeader>

//       <form onSubmit={handleSubmit} className="grid gap-4 py-4">
//         <div className="grid gap-2 w-full">
//           <Label htmlFor="nomCategorie">Catégorie</Label>
//           <Input
//             id="nomCategorie"
//             name="nomCategorie"
//             type="text"
//             value={nomCategorie}
//             onChange={(e) => setCategorie(e.target.value)}
//             required
//             className="w-full"
//           />
//         </div>

//         <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
//           <Button variant="outline" type="button" onClick={onClose}>
//             Annuler
//           </Button>
//           <Button type="submit" disabled={loading}>
//             {" "}
//             {loading ? "Enregistrement..." : "Enregistrer"}
//           </Button>
//         </DialogFooter>
//       </form>
//     </DialogContent>
//   );
// }
