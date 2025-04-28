import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.categorie.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des catégories récupérée avec succès.",
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les catégories.",
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
