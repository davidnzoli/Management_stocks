import { LoginForm } from "@/components/loginForm";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

// const token = request.cookies.get("token")?.value;

// if (request.nextUrl.pathname.startsWith("/api")) {
//   return NextResponse.next();
// }

// // Autoriser l'accès aux fichiers statiques générés par Next.js
// const isStaticFile =
//   request.nextUrl.pathname.startsWith("/_next") ||
//   request.nextUrl.pathname.startsWith("/static");
// if (isStaticFile) {
//   return NextResponse.next();
// }

// const isAuthPage = request.nextUrl.pathname.startsWith("/loginsss");

// // Redirection si non authentifié
// if (!token && !isAuthPage) {
//   return NextResponse.redirect(new URL("/loginsss", request.url));
// }

// // Redirection si déjà connecté et essaie d'accéder à /login
// if (token && isAuthPage) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// // Si l'utilisateur est connecté, vérifier le rôle
// if (token) {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const role = decoded.role;
//     const pathname = request.nextUrl.pathname;

//     // Redirection si le caissier tente d'accéder à une page réservée aux admins
//     if (role === "caissier" && pathname.startsWith("/admin")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     // (Optionnel) Redirection si un admin tente d’accéder à une page réservée aux caissiers
//     if (role === "admin" && pathname.startsWith("/caissier")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }
//     if (role === "admin" && pathname.startsWith("/invite")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }
//   } catch (error) {
//     console.error("Erreur de vérification du token :", error);
//     return NextResponse.redirect(new URL("/loginsss", request.url));
//   }
// }

// return NextResponse.next();
