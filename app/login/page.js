"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #494C4F;
  color: white;
`;

const Logo = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginForm = styled.div`
  background: white;
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
  border-radius: 0;
  color: black;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const InputContainer = styled.div`
  position: relative;
  margin: 1rem 0;
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  transition: 0.3s ease-in-out;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 1rem;
  outline: none;
  background: transparent;
  transition: 0.3s;

  &:focus {
    border-bottom: 2px solid #333;
  }

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 0px;
    font-size: 0.8rem;
    color: #333;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  border-radius: 0;

  &:hover {
    background-color: #555;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #f4a261;
  font-weight: bold;
`;

const LinkText = styled.p`
  font-size: 0.9rem;

  a {
    color: #f4a261;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Connexion avec", data);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container>
      <Logo>RED PRODUCT</Logo>
      <LoginForm>
        <Title>Connectez-vous en tant que Admin</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input 
              type="email" 
              placeholder=" " 
              id="email" 
              {...register('email', { required: 'Email is required' })} 
            />
            <Label htmlFor="email">E-mail</Label>
            {errors.email && <p>{errors.email.message}</p>}
          </InputContainer>
          <InputContainer>
            <Input 
              type="password" 
              placeholder=" " 
              id="password" 
              {...register('password', { required: 'Password is required' })} 
            />
            <Label htmlFor="password">Mot de passe</Label>
            {errors.password && <p>{errors.password.message}</p>}
          </InputContainer>
          <CheckboxContainer>
            <Checkbox type="checkbox" id="remember" {...register('remember')} />
            <label htmlFor="remember">Gardez-moi connecté</label>
          </CheckboxContainer>
          <Button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : 'Se connecter'}
          </Button>
        </form>
      </LoginForm>
      <LinkContainer>
        <LinkText>
          <a href="#">Mot de passe oublié?</a>
        </LinkText>
        <LinkText>
          Vous n’avez pas de compte? <a href="#">S'inscrire</a>
        </LinkText>
      </LinkContainer>
    </Container>
  );
};

export default Login;
