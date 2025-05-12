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

interface Categorie {
  id: string;
  nomCategorie: string;
  designationCategorie: string;
}

export default function Categoryproduit() {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  async function fetchCategories() {
    const res = await fetch("/api/products");
    const resulta = await res.json();
    setCategories(resulta.data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(categories);

  const handleDelete = (id: string) => {
    setAllUsers((prev) => prev.filter((categorie) => categorie.id !== id));
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
          <Dialog open={opens} onOpenChange={setOpens}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 cursor-pointer flex items-center">
                Ajouter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddCategory onClose={() => setOpens(false)} />
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">DESIGNATIONS</TableHead>
            <TableHead className="text-right font-medium">CATEGORIES</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((categorie) => (
              <TableRow key={categorie.id}>
                <TableCell>{categorie.designationCategorie}</TableCell>
                <TableCell className="text-right">
                  {categorie.nomCategorie}
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-center flex items-center justify-center gap-2">
                    <DeletePopupCategory
                      categoryId={categorie.id}
                      onDeletes={handleDelete}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategoryId(categorie.id);
                        setOpen(true);
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
                Aucune catégorie trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Modifier la catégorie</DialogTitle>
          {selectedCategoryId && (
            <UpdatedCategory
              categoryId={selectedCategoryId}
              onClose={() => setOpen(false)}
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
