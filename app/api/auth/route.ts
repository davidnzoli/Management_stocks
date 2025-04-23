import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma"; // ou ton chemin vers Prisma

const SECRET_KEY = process.env.JWT_SECRET || "secret-key";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Champs manquants." },
        { status: 400 }
      );
    }

    // Vérifie l'utilisateur en base de données
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    // Vérifie le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    // Génère un token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    // Option : retourne aussi le nom ou le rôle
    return NextResponse.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
      redirectUrl:
        user.role === "admin"
          ? "/Dashboard/admindashboard"
          : "/Dashboard/userdashboard", // Exemple de redirection selon le rôle
    });
  } catch (err) {
    console.error("Erreur API login:", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// const router = useRouter();
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState("");

// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();
//   console.log("🔄 Tentative de connexion...");

//   try {
//     const res = await fetch("/api/auth", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     console.log("📡 Status:", res.status);
//     console.log("📄 Content-Type:", res.headers.get("content-type"));

//     const contentType = res.headers.get("content-type");

//     if (res.ok) {
//       if (contentType?.includes("application/json")) {
//         const data = await res.json();
//         console.log("✅ Succès :", data);

//         // 👉 Ici, tu peux rediriger ou stocker le token par exemple
//         // router.push("/dashboard");
//       } else {
//         const text = await res.text();
//         console.log("ℹ️ Réponse texte :", text);
//       }
//     } else {
//       // Erreur côté serveur ou credentials
//       const errorMessage = contentType?.includes("application/json")
//         ? (await res.json()).message
//         : await res.text();

//       console.error("❌ Erreur login :", errorMessage);
//       alert("Erreur : " + errorMessage);
//     }
//   } catch (error) {
//     console.error("💥 Erreur attrapée :", error);
//     alert(
//       "Une erreur est survenue. Vérifie ta connexion ou réessaye plus tard."
//     );
//   }
