import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "./ui/button";
import { Trash, Edit } from "lucide-react";
export default function DeletePopupProduit({
  produitId,
  onDeletes,
}: {
  produitId: string;
  onDeletes: (id: string) => void;
}) {
  const handleDeleteProduit = async () => {
    try {
      const res = await fetch(`/api/products2/${produitId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Produit supprimé avec succès ✅");
        onDeletes(produitId);
      } else {
        toast.error(result.error || "Erreur lors de la suppression ❌");
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white ">
        <Trash className="h-6 w-6 rounded-b-md cursor-pointer text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription className="">
            Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={handleDeleteProduit}
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
