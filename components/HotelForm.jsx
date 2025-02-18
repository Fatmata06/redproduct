"use client";
import styled from "styled-components";
import { useState } from "react";

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: gray;
  }
`;

export default function HotelForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        price: "",
        currency: "XOF",
        image: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <FormContainer>
            <h2>Créer un nouveau hôtel</h2>
            <form onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Nom de l'hôtel" onChange={handleChange} required />
                <Input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
                <Input type="text" name="address" placeholder="Adresse" onChange={handleChange} required />
                <Input type="text" name="phone" placeholder="Téléphone" onChange={handleChange} required />
                <Input type="text" name="price" placeholder="Prix par nuit" onChange={handleChange} required />
                <Input type="file" name="image" onChange={handleChange} />
                <Button type="submit">Enregistrer</Button>
            </form>
        </FormContainer>
    );
}
