"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Link from "next/link";
import BContainer from "@/components/background";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  padding-bottom: 0.5rem;
  position: relative;
  z-index: 1;
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
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
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

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Une erreur est survenue");
      }

      toast.success(result.message);
      router.push("/login");
    } catch (error) {
      toast.error(error);
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

        <Title>Inscrivez-vous en tant qu'Admin</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input type="text" placeholder=" " {...register('name', { required: "Le nom est requis" })} />
            <Label>Nom</Label>
            {errors.name && <p>{errors.name.message}</p>}
          </InputContainer>

          <InputContainer>
            <Input type="email" placeholder=" " {...register('email', { required: "L'email est requis" })} />
            <Label>Email</Label>
            {errors.email && <p>{errors.email.message}</p>}
          </InputContainer>

          <InputContainer>
            <Input type="password" placeholder=" " {...register('password', { required: "Le mot de passe est requis" })} />
            <Label>Mot de passe</Label>
            {errors.password && <p>{errors.password.message}</p>}
          </InputContainer>

          <CheckboxContainer>
            <Checkbox type="checkbox" {...register('terms', { required: "Vous devez accepter les conditions" })} />
            <label>Accepter les termes et la politique</label>
          </CheckboxContainer>

          <Button type="submit" disabled={loading}>{loading ? "Chargement..." : "S'inscrire"}</Button>
        </form>

      </Container>
      <LinkContainer>
        <LinkText>Vous avez déjà un compte ? <Link href="/login">Se connecter</Link></LinkText>
      </LinkContainer>
    </BContainer>
  );
};

export default Signup;
