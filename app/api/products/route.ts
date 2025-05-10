import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categorie = await prisma.categorie.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des categorie récupérée avec succès.",
        data: categorie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des categories :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les categories.",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newProduct = await prisma.categorie.create({
      data: {
        nomCategorie: body.nomCategorie,
        designationCategorie: body.designationCategorie,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur lors de l'enregistrement du produit." },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import bcrypt from "bcrypt";

// import { prisma } from "@/lib/prisma"; // adapte selon ton projet

// export async function GET() {
//   const users = await prisma.categorie.findMany();
//   return Response.json(users);
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const data = await request.json();

//   try {
//     if (data.password) {
//       data.password = await bcrypt.hash(data.password, 10);
//     }

//     const updatedUser = await prisma.categorie.update({
//       where: { id },
//       data,
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error("Erreur de mise à jour :", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la mise à jour" },
//       { status: 500 }
//     );
//   }
// }
// // DELETE user
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;

//   try {
//     await prisma.categorie.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Utilisateur supprimé" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Erreur lors de la suppression" },
//       { status: 500 }
//     );
//   }
// }
