"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import BContainer from "@/components/background";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
  color: white;
  background: linear-gradient(to right, #141e30, #243b55);
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 15px;
  letter-spacing: 2px;
  color: #f5f5f5;
`;

const Description = styled.p`
  font-size: 1.4rem;
  max-width: 700px;
  line-height: 1.8;
  color: #d1d1d1;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 14px 28px;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  background: #ff8c00;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    background: #e07b00;
    transform: scale(1.05);
  }
`;

export default function Home() {
  const router = useRouter();

  return (
    <BContainer>
        <Title>RED PRODUCT</Title>
        <Description>La solution ultime pour une gestion efficace des hôtels.</Description>
        <Button onClick={() => router.push("/dashboard")}>Accéder à la plateforme</Button>
    </BContainer>
  );
}
