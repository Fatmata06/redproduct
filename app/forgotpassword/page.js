"use client"; // Ajouté si tu utilises Next.js 13+ avec App Router
import styled from "styled-components";

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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/before.png");
    background-size: cover;
    background-position: center;
    opacity: 1; /* Ajuste l'opacité de l'image */
    z-index: -1; /* Place l'image en arrière-plan */
  }
`;

const LogoContainer = styled.div`
  width: 384px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
  background: #494C4F;
  text-align: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 26.66px;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const LogoImage = styled.img`
  width: 32px;
  height: 32px;
`;

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
  margin-top: 16px;
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

const Label = styled.label`
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
  &:focus {
    border-color: #6b7280;
  }
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 10px;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #374151;
  }
`;

const LinkContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const LinkText = styled.p`
  font-size: 0.9rem;
  color: #ffffff;

  a {
    color: #FFD964;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Link = styled.a`
  color: #f59e0b;
  text-decoration: none;
  font-size: 0.875rem;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Un lien de réinitialisation a été envoyé à votre email !");
  };

  return (
    <BContainer>
      <LogoContainer>
        <Logo>
          <LogoImage src="/images/logo.png" alt="Logo" />
          RED PRODUCT
        </Logo>
      </LogoContainer>

      <Card>
        <Title>Mot de passe oublié?</Title>
        <Text>
          Entrez votre adresse email ci-dessous et nous vous enverrons des
          instructions pour modifier votre mot de passe.
        </Text>

        <Form onSubmit={handleSubmit}>
          <Label>Votre email</Label>
          <Input type="email" placeholder="Entrez votre email" required />
          <Button type="submit">Envoyer</Button>
        </Form>

    
      </Card>

      <LinkContainer>
        <LinkText>
             Revenir à la <Link href="/login">connexion</Link>
        </LinkText>
      </LinkContainer>
    </BContainer>
  );
}
