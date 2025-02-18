"use client";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0;
`;

const Price = styled.p`
  font-size: 14px;
  color: gray;
`;

export default function HotelCard({ hotel }) {
  return (
    <Card>
      <Image src={hotel.image} alt={hotel.name} />
      <Title>{hotel.name}</Title>
      <Price>{hotel.price} XOF par nuit</Price>
    </Card>
  );
}
