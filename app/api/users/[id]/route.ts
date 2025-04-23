import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma"; // adapte selon ton projet

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  return Response.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
   
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur de mise à jour :", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
// DELETE user
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
