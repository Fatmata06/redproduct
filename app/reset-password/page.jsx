"use client";
import styled from "styled-components";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BContainer from "@/components/background";

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Text = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
  margin-top: 8px;
`;

const Form = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 10px;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const tokenFromURL = searchParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("❌ Token invalide ou manquant.");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✔ Mot de passe mis à jour avec succès !");
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setMessage("❌ " + result.message);
      }
    } catch (error) {
      setMessage("❌ Impossible de mettre à jour le mot de passe.");
    }
  };

  return (
    <BContainer>
      <Card>
        <Title>🔒 Réinitialisation du Mot de Passe</Title>
        <Text>Entrez votre nouveau mot de passe.</Text>
        {message && <Text style={{ color: message.includes("✔") ? "green" : "red" }}>{message}</Text>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit">Réinitialiser</Button>
        </Form>
      </Card>
    </BContainer>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
