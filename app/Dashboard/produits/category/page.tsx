// "use client";
// import * as React from "react";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Check, ChevronsUpDown } from "lucide-react";
// import {
//   ArrowUpDown,
//   ChevronDown,
//   MoreHorizontal,
//   ArrowRight,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import AddCategory from "@/components/AddCategory_popup";

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

// interface Categorie {
//   id: string;
//   nomCategorie: string;
//   designationCategorie: String;
// }

// export default function Categoryproduit() {
//   const [open, setOpen] = React.useState(false);
//   const [opens, setOpens] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   const [categories, setCategories] = useState<Categorie[]>([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setCategories(data.data);
//     }

//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <div className="flex h-16 justify-between items-center gap-3.5">
//         <div className="flex justify-center items-center gap-2">
//           <Input
//             type="category"
//             className="w-70"
//             placeholder="Filtrer par nom de categorie"
//           />
//           <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className="w-[200px] justify-between"
//               >
//                 {value
//                   ? frameworks.find((framework) => framework.value === value)
//                       ?.label
//                   : "Select framework..."}
//                 <ChevronsUpDown className="opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[200px] p-0">
//               <Command>
//                 <CommandInput placeholder="Search framework..." />
//                 <CommandList>
//                   <CommandEmpty>No framework found.</CommandEmpty>
//                   <CommandGroup>
//                     {frameworks.map((framework) => (
//                       <CommandItem
//                         key={framework.value}
//                         value={framework.value}
//                         onSelect={(currentValue) => {
//                           setValue(currentValue === value ? "" : currentValue);
//                           setOpen(false);
//                         }}
//                       >
//                         {framework.label}
//                         <Check
//                           className={cn(
//                             "ml-auto",
//                             value === framework.value
//                               ? "opacity-100"
//                               : "opacity-0"
//                           )}
//                         />
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         </div>
//         <div className="flex justify-center items-center gap-2">
//           <Button className="bg-green-950 cursor-pointer flex items-center">
//             Appliquer
//           </Button>
//           <Dialog open={opens} onOpenChange={setOpens}>
//             <DialogTrigger asChild>
//               <Button className="bg-green-500 cursor-pointer flex items-center">
//                 Ajouter
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </DialogTrigger>
//             <AddCategory onClose={() => setOpens(false)} />
//           </Dialog>
//         </div>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="font-medium">ID</TableHead>
//             <TableHead className="font-medium">DESIGNATIONS</TableHead>
//             <TableHead className="text-right font-medium">CATEGORIES</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {categories && categories.length > 0 ? (
//             categories.map((categorie) => (
//               <TableRow key={categorie.id}>
//                 <TableCell>{categorie.id}</TableCell>
//                 <TableCell>{categorie.designationCategorie}</TableCell>
//                 <TableCell className="text-right">
//                   {categorie.nomCategorie}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={3} className="text-center">
//                 Aucune catégorie trouvée
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </>
//   );
// }

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

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AddCategory from "@/components/AddCategory_popup";
import Pagination from "@/components/pagination";

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
  const [categoriesPerPage] = useState(10);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setCategories(data.data);
    }

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

  return (
    <>
      <div className="flex h-16 bg-white px-5 justify-between items-center gap-3.5">
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
            <TableHead className="font-medium">ID</TableHead>
            <TableHead className="font-medium">DESIGNATIONS</TableHead>
            <TableHead className="text-right font-medium">CATEGORIES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((categorie) => (
              <TableRow key={categorie.id}>
                <TableCell>{categorie.id}</TableCell>
                <TableCell>{categorie.designationCategorie}</TableCell>
                <TableCell className="text-right">
                  {categorie.nomCategorie}
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
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
