"use client";
import styled from "styled-components";
import { useState } from "react";

const BContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #494C4F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✔ Vérifiez votre boîte mail pour le lien de réinitialisation.");
      } else {
        setMessage("❌ Une erreur s'est produite.");
      }
    } catch (error) {
      setMessage("❌ Impossible d'envoyer la requête.");
    }
  };

  return (
    <BContainer>
      <Card>
        <Title>Mot de passe oublié ?</Title>
        <Text>Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.</Text>
        {message && <Text style={{ color: message.includes("✔") ? "green" : "red" }}>{message}</Text>}
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit">Envoyer</Button>
        </Form>
      </Card>
    </BContainer>
  );
}