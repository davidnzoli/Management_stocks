import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Role } from "@/app/generated/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

const allowedRoles = Object.values(Role); 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // ✅ Validation directe
    if (!allowedRoles.includes(role)) {
      console.error("Rôle invalide. Body reçu :", body);
      return NextResponse.json(
        { error: "Rôle invalide. Utilisez 'admin', 'caissier', ou 'invité'" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role as Role, // ✅ Typage propre et direct
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Erreur création user :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
