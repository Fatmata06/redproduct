"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const Container = styled.div`

  width: 384px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const LogoContainer = styled.div`
  width: 384px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
  background: #494C4F;
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

const Title = styled.h2`
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #000000DE;
  margin-bottom: 2rem;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-family: Roboto, sans-serif;
  font-size: 16px;
  color: #777;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  background: transparent;

  &:focus {
    border-color: #333;
  }

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 5px;
    font-size: 0.8rem;
    color: #333;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: #45484B;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #777;
    cursor: not-allowed;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  font-weight: bold;
  width: 384px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
  background: #494C4F;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Identifiants incorrects");
      }

      console.log(result);

      localStorage.setItem("token", result.token);
      alert("Connexion réussie !");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BContainer>
      <LogoContainer>
        <Logo>
          <LogoImage src="/images/logo.png" alt="Logo" />
          RED PRODUCT
        </Logo>
      </LogoContainer>
      <Container>


        <Title>Connectez-vous en tant qu'Admin</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              type="email"
              id="email"
              placeholder=" "
              {...register('email', {
                required: "L'email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Adresse e-mail invalide"
                }
              })}
            />
            <Label htmlFor="email">E-mail</Label>
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              id="password"
              placeholder=" "
              {...register('password', {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères"
                }
              })}
            />
            <Label htmlFor="password">Mot de passe</Label>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputContainer>

          <CheckboxContainer>
            <Checkbox type="checkbox" id="remember" {...register('remember')} />
            <label htmlFor="remember">Gardez-moi connecté</label>
          </CheckboxContainer>

          <Button type="submit" disabled={loading}>
            {loading ? "Chargement..." : "Se connecter"}
          </Button>
        </form>


      </Container>
      <LinkContainer>
        <LinkText>
          <Link href="forgotpassword">Mot de passe oublié ?</Link>
        </LinkText>
        <LinkText>
          Vous n’avez pas de compte ? <Link href="/signup">S'inscrire</Link>
        </LinkText>
      </LinkContainer>
    </BContainer>
  );
};

export default Login;
