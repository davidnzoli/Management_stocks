import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const user = await prisma.product.findUnique({
    where: { id },
  });

  return Response.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { nomProduit, description, prix, quantite, codeBarre, categorieId } =
      body;

    const updatedCategorie = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        nomProduit,
        description,
        prix,
        quantite,
        codeBarre,
        categorieId,
      },
    });

    return new Response(JSON.stringify(updatedCategorie), { status: 200 });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new Response(
        JSON.stringify({
          message: `Le champ "${
            Array.isArray(error.meta?.target)
              ? error.meta?.target.join(", ")
              : "champ inconnu"
          }" existe déjà .`,
        }),
        { status: 409 }
      ); // 409 = Conflict
    }

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
    const categoryExists = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!categoryExists) {
      return NextResponse.json(
        {
          error:
            "Produit non trouvée (OU SOIT ELLE EST DÉJA ÉTÈ SUPPRIMMER, Actualiser la page !",
        },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Produit supprimée avec succès" });
  } catch (error) {
    console.error("Erreur de suppression:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
