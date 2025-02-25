import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloudinary_url: "cloudinary://746613232353128:vcvtydB5TyNetkEnQ7Yi_0ebMAc@dfq2f26cz",
});

export async function POST(req) {
  console.log("Requête POST /api/upload");
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return new Response(JSON.stringify({ error: "Aucune image fournie" }), {
        status: 400,
      });
    }

    // Upload sur Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "produits",
    });

    console.log("Upload réussi:", uploadResponse.secure_url);

    return new Response(JSON.stringify({ url: uploadResponse.secure_url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur Cloudinary:", error);
    return new Response(JSON.stringify({ error: "Erreur lors du téléversement" }), {
      status: 500,
    });
  }
}
