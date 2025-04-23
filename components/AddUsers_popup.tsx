

"use client";

import * as React from "react";
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

interface AddDataDialogContentProps {
  onClose: () => void;
}

export default function AddUsers({ onClose }: AddDataDialogContentProps) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de l'ajout de l'utilisateur");
      }

      const user = await res.json();
      console.log("Utilisateur ajouté :", user);
      setFormData({ email: "", password: "", role: "" });
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=open]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Adresse email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            name="password"
            placeholder="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="role">Rôle</Label>
          <Select
            name="role"
            value={formData.role}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, role: value }))
            }
            required
          >
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder="Sélectionnez un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">admin</SelectItem>
              <SelectItem value="caissier">caissier</SelectItem>
              <SelectItem value="invité">invité</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
