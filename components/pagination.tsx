// // components/Pagination.tsx

// import React from "react";
// import { Button } from "@/components/ui/button";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (pageNumber: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//   // Calcul des numéros de pages à afficher (de 1 à 10)
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     if (i <= 10) {
//       pageNumbers.push(i);
//     } else {
//       break;
//     }
//   }

//   return (
//     <div className="flex justify-between items-center mt-4">
//       {/* Bouton Précédent */}
//       <Button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         Précédent
//       </Button>

//       {/* Affichage des numéros de pages */}
//       <div className="flex space-x-2">
//         {pageNumbers.map((page) => (
//           <Button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={page === currentPage ? "bg-blue-500 text-white" : ""}
//           >
//             {page}
//           </Button>
//         ))}
//       </div>

//       {/* Bouton Suivant */}
//       <Button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         Suivant
//       </Button>
//     </div>
//   );
// };

// export default Pagination;

// components/Pagination.tsx

import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  let pageNumbers: (number | string)[] = [];

  if (totalPages <= 10) {
    pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);
  } else {
    pageNumbers = [
      1,
      2,
      3,
      4,
      5,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ].filter((page) => typeof page === "number" && page <= totalPages);
  }

  return (
    <div className="flex w-[100%] h-11 justify-end items-end mt-4 gap-3">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        Précédent
      </Button>

      <div className="flex gap-3">
        {pageNumbers.map((page, index) => (
          <Button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            className={
              typeof page === "number" && page === currentPage
                ? "bg-green-500 text-white "
                : ""
            }
            disabled={typeof page === "string"}
          >
            {page === "..." ? "..." : page}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        Suivant
      </Button>
    </div>
  );
};

export default Pagination;
