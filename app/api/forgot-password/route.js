import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/user";
import crypto from "crypto";
import sendEmail from "@/utils/sendEmail";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "L'email est requis." }, { status: 400 });
  }

  // 🔹 Trouver l'utilisateur associé à l'email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 });
  }

  // 🔹 Générer un token de réinitialisation
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  // 🔹 Envoyer un email avec le lien de réinitialisation
  const resetUrl = `https://zahra.e-ceddo.com/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "🔑 Réinitialisation de votre mot de passe",
    message: `Bonjour,\n\nCliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :\n\n${resetUrl}\n\nCe lien est valable 1 heure.`,
  });

  return NextResponse.json({ message: "Email envoyé avec succès." }, { status: 200 });
}