import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  console.log("📩 Requête reçue pour /api/reset-password");

  try {
    await dbConnect();
    const { token, newPassword } = await req.json();
    console.log("🔑 Token reçu :", token);
    console.log("🆕 Nouveau mot de passe :", newPassword);

    if (!token || !newPassword) {
      console.error("❌ Token ou mot de passe manquant !");
      return NextResponse.json({ message: "Token et mot de passe requis." }, { status: 400 });
    }

    // 🔹 Vérifier si le token est valide et non expiré
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    
    if (!user) {
      console.error("❌ Token invalide ou expiré !");
      return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 400 });
    }

    // 🔹 Hasher le nouveau mot de passe et enregistrer
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log("✅ Mot de passe mis à jour pour :", user.email);
    return NextResponse.json({ message: "Mot de passe mis à jour avec succès !" }, { status: 200 });

  } catch (error) {
    console.error("❌ Erreur dans l'API reset-password :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
