export default async function sendEmail({ to, subject, message }) {
    const payload = { to, subject, message };

    try {
        const response = await fetch("https://codingmailer.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok) {
            console.error("❌ Erreur d’envoi d'email :", result);
        } else {
            console.log("✅ Email envoyé :", result);
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
}
