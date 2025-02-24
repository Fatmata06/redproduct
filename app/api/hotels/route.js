import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hotel from "@/models/hotel";

export async function GET() {
  await dbConnect();
  
  try {
    const hotels = await Hotel.find({});
    return NextResponse.json(hotels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json(); // Lire le JSON envoyé
    const { name, price, image } = body;
    
    const newHotel = new Hotel({ name, price, image });
    await newHotel.save();

    return NextResponse.json(newHotel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
