"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogContent } from "@/components/ui/dialog";
import DeletePopupCategory from "@/components/deletePopupCategory";
import { Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AddCategory from "@/components/AddCategory_popup";
import Pagination from "@/components/pagination";
import { Trash, Edit } from "lucide-react";
import UpdatedCategory from "@/components/updateCategory";
import AddProduit from "@/components/AddProduit_popup";
import UpdatedProduit from "@/components/UpdateProduit";
import DeletePopupProduit from "@/components/deletePopupProduit";

interface Categorie {
  id: string;
  nomCategorie: string;
  designationCategorie: string;
}
interface Products {
  id: string;
  nomProduit: string;
  description: string;
  prix: string;
  quantite: string;
  codeBarre: string;
  categorie: Categorie;
}

export default function ListeProduits() {
  const [openDialogueProduit, setOpenDialogueProduit] = React.useState(false);
  const [openProduit, setOpenProduit] = React.useState(false);
  const [produits, setProduits] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  async function fetchCategories() {
    try {
      const res = await fetch("/api/products2");
      const resulta = await res.json();

      if (Array.isArray(resulta.data)) {
        setProduits(resulta.data);
      } else {
        console.error("Structure inattendue:", resulta);
        setProduits([]);
      }
    } catch (error) {
      console.error("Erreur lors du fetch:", error);
      setProduits([]);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalCategories = produits.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = produits.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(produits);

  const handleDeleteProduit = (id: string) => {
    setAllUsers((prev) =>
      prev.filter((produitItems) => produitItems.id !== id)
    );
  };

  return (
    <>
      <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
        <div className="flex justify-center items-center gap-2">
          <Input
            type="category"
            className="w-70"
            placeholder="Filtrer par nom de categorie"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button className="bg-green-950 cursor-pointer flex items-center">
            Appliquer
          </Button>
          <Dialog open={openProduit} onOpenChange={setOpenProduit}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 cursor-pointer flex items-center">
                Ajouter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddProduit onClosed={() => setOpenProduit(false)} />
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">PRODUITS</TableHead>
            <TableHead className="font-medium">DESCRIPRION</TableHead>
            <TableHead className="text-right font-medium">PRIX</TableHead>
            <TableHead className="text-right font-medium">QUANTITES</TableHead>
            <TableHead className="text-right font-medium">CATEGORIES</TableHead>
            <TableHead className="text-right font-medium">CODE BARRE</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((produitItems) => (
              <TableRow key={produitItems.id}>
                <TableCell>{produitItems.nomProduit}</TableCell>
                <TableCell className="text-start">
                  {produitItems.description}
                </TableCell>
                <TableCell className="text-center">
                  {produitItems.prix}
                </TableCell>
                <TableCell className="text-center">
                  {produitItems.quantite}
                </TableCell>
                <TableCell className="text-center">
                  {produitItems.categorie?.nomCategorie ?? "Non défini"}
                </TableCell>
                <TableCell className="text-right">
                  {produitItems.codeBarre}
                </TableCell>

                <TableCell className="text-right">
                  <div className="text-center flex items-center justify-center gap-2">
                    <DeletePopupProduit
                      produitId={produitItems.id}
                      onDeletes={handleDeleteProduit}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedProductId(produitItems.id);
                        setOpenDialogueProduit(true);
                      }}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <Edit className="h-5 w-5 text-blue-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Aucun produit trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={openDialogueProduit} onOpenChange={setOpenDialogueProduit}>
        <DialogContent>
          <DialogTitle>Modifier le produit</DialogTitle>
          {selectedProductId && (
            <UpdatedProduit
              produitId={selectedProductId}
              onClose={() => setOpenDialogueProduit(false)}
              onUpdate={fetchCategories}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="flex justify-center mt-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
