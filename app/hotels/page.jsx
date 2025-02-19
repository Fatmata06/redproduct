"use client";

import styled from "styled-components";
import { Menu, Bell, User, Plus, LogOut } from "lucide-react";
import HotelCard from "@/components/HotelCard";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import HotelForm from "@/components/HotelForm";
import { useState } from "react";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2e2f38;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
`;

const MainContent = styled.div`
  margin-left: 250px;
  flex-grow: 1;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
`;


const SidebarItem = styled.div`
  padding: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const HotelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: gray;
  }
`;

const PopupContainer = styled.div`
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

const PopupContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const hotels = [
  { name: "Hôtel Terrou-Bi", price: "50.000 XOF", image: "/terrou.png" },
  { name: "King Fahd Palace", price: "60.000 XOF", image: "/king_fahd.png" },
  { name: "Radisson Blu", price: "55.000 XOF", image: "/radisson.png" },
  { name: "Pullman Dakar", price: "65.000 XOF", image: "/pullman.png" },
  { name: "Hôtel Lac Rose", price: "40.000 XOF", image: "/lac_rose.png" },
  { name: "Hôtel Saly", price: "30.000 XOF", image: "/saly.png" },
  { name: "Palm Beach Resort", price: "45.000 XOF", image: "/palm.png" },
  { name: "Pullman Dakar Teranga", price: "70.000 XOF", image: "/teranga.png" },
];

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
  }
`;

export default function HotelsPage() {
  const [showForm, setShowForm] = useState(false);
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <p>Chargement...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <div>
          <h2>RED PRODUCT</h2>
          <SidebarItem as={Link} href="/dashboard">
            <Menu /> Dashboard
          </SidebarItem>
          <SidebarItem>
            <Bell /> Notifications
          </SidebarItem>
        </div>
        <SidebarItem>
          <User /> Mon Profil
        </SidebarItem>
        <LogoutButton onClick={handleLogout}>
          <LogOut /> Déconnexion
        </LogoutButton>
      </Sidebar>

      {showForm && (
        <PopupContainer>
          <HotelForm onSubmit={() => setShowForm(false)} />
          <CloseButton onClick={() => setShowForm(false)}>✖</CloseButton>
        </PopupContainer>
      )}

      {/* Contenu principal */}
      <MainContent>
        <Header>
          <h2>Liste des hôtels</h2>
          <Button onClick={() => setShowForm(true)}>
            <Plus size={16} /> Créer un nouvel hôtel
          </Button>
        </Header>

        {/* Liste des hôtels */}
        <HotelsGrid>
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </HotelsGrid>
      </MainContent>
    </DashboardContainer>
  );
}
