import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const produits = await prisma.product.findMany({
      include: {
        categorie: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Liste des produits récupérés avec succès.",
        data: produits,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les produits.",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const newProduct = await prisma.product.create({
      data: {
        codeBarre: body.codeBarre,
        nomProduit: body.nomProduit,
        description: body.description,
        prix: parseFloat(body.prix),
        quantite: parseInt(body.quantite, 10),
        categorie: {
          connect: { id: body.categorie }, // ← relation connect
        },
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du produit :", error);
    return NextResponse.json(
      { message: "Erreur lors de l'enregistrement du produit." },
      { status: 500 }
    );
  }
}
