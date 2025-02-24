"use client";
import styled from "styled-components";
import { useState } from "react";
import { X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: white;
  width: 600px;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background: white;
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background: white;
`;

const FileInputContainer = styled.div`
  width: 100%;
  height: 120px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #494c4f;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #333;
  }
`;

export default function HotelForm({ onClose, onSubmit }) {
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

  const handleSubmit = async (hotelData) => {
    try {
      const response = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      });
  
      if (response.ok) {
        const newHotel = await response.json();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'hôtel", error);
    }
  };
  
  return (
    <Overlay>
      <FormContainer>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        <Title>Créer un nouveau hôtel</Title>
        <form onSubmit={handleSubmit}>
          <FormRow>
            <Input type="text" name="name" placeholder="Nom de l'hôtel" onChange={handleChange} required />
            <Input type="text" name="address" placeholder="Adresse" onChange={handleChange} required />
          </FormRow>

          <FormRow>
            <Input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
            <Input type="text" name="phone" placeholder="Numéro de téléphone" onChange={handleChange} required />
          </FormRow>

          <FormRow>
            <Input type="text" name="price" placeholder="Prix par nuit" onChange={handleChange} required />
            <Select name="currency" onChange={handleChange}>
              <option value="XOF">F XOF</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </Select>
          </FormRow>

          <FileInputContainer>
            <label htmlFor="image-upload">
              <input type="file" id="image-upload" name="image" style={{ display: "none" }} onChange={handleChange} />
              <span>📷 Ajouter une photo</span>
            </label>
          </FileInputContainer>

          <Button type="submit">Enregistrer</Button>
        </form>
      </FormContainer>
    </Overlay>
  );
}
