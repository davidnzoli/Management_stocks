import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await prisma.categorie.findUnique({
    where: { id },
  });

  return Response.json(user);
}

// PUT pour modifier une catégorie
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { nomCategorie, designationCategorie } = body;

    const updatedCategorie = await prisma.categorie.update({
      where: {
        id: params.id,
      },
      data: {
        nomCategorie,
        designationCategorie,
      },
    });

    return new Response(JSON.stringify(updatedCategorie), { status: 200 });
  } catch (error) {
    console.error("Erreur PUT :", error);
    return new Response(JSON.stringify({ message: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const categoryExists = await prisma.categorie.findUnique({
      where: { id: id },
    });

    if (!categoryExists) {
      return NextResponse.json(
        {
          error:
            "Catégorie non trouvée (OU SOIT ELLE EST DÉJA ÉTÈ SUPPRIMMER, Actualiser la page !",
        },
        { status: 404 }
      );
    }

    await prisma.categorie.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur de suppression:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
