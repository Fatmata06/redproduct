import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ message: "Tous les champs sont obligatoires" }, { status: 400 });
  }

  
  // 🔹 Trouver l'utilisateur associé à l'email
  const user = await User.findOne({ email: resetRequest.email });
  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 404 });
  }

  // 🔹 Hasher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return NextResponse.json({ message: "Mot de passe mis à jour avec succès !" }, { status: 200 });
}
