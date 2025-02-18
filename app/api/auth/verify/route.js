import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: '⚠️ Token manquant ou invalide' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, "kgojvzKjD+Z8//jX5GYFwmhvTAnX1vtRwLQ81C2x7Hk=");

    if (!decoded) {
      return NextResponse.json({ message: '⚠️ Token invalide' }, { status: 401 });
    }

    return NextResponse.json({ message: '✅ Authentification réussie', user: decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '❌ Erreur d\'authentification', error: error.message }, { status: 500 });
  }
}
