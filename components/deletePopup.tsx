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

export default function DeletePopup({
  userId,
  onDelete,
}: {
  userId: string;
  onDelete: (id: string) => void;
}) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Utilisateur supprimé avec succès ✅");
        onDelete(userId);
      } else {
        toast.error(result.error || "Erreur lors de la suppression ❌");
      }
    } catch (err) {
      toast.error("Une erreur est survenue");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-white w-[100%] ">
        <span className="w-[100%] p-1.5 px-7 bg-red-500 rounded-md cursor-pointer">
          Supprimer
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
            est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
