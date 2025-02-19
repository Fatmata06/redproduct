"use client";
import styled from "styled-components";
import { Menu, Bell, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #2e2f38;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h4`
  font-size: 14px;
  color: gray;
`;

const StatValue = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

export default function Dashboard() {
  const isAuthenticated = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return <p>Chargement...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login"); // Rediriger vers la page de connexion
  };

  return (
    <DashboardContainer>
      {/* Barre latérale */}
      <Sidebar>
        <div>
          <h2>RED PRODUCT</h2>
          <SidebarItem>
            <Menu /> Dashboard
          </SidebarItem>
          <SidebarItem>
            <User /> Utilisateurs
          </SidebarItem>
          <SidebarItem>
            <Bell /> Notifications
          </SidebarItem>
        </div>
        <div>
          <SidebarItem>
            <User /> Mon Profil
          </SidebarItem>
          <LogoutButton onClick={handleLogout}>
            <LogOut /> Déconnexion
          </LogoutButton>
        </div>
      </Sidebar>

      {/* Contenu principal */}
      <MainContent>
        <Header>
          <h2>Bienvenue sur RED Product</h2>
          <div>
            <input type="text" placeholder="Recherche..." style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid gray" }} />
          </div>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatTitle>Formations</StatTitle>
            <StatValue>125</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Messages</StatTitle>
            <StatValue>40</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Utilisateurs</StatTitle>
            <StatValue>600</StatValue>
          </StatCard>
          <StatCard>
            <StatTitle>Commandes</StatTitle>
            <StatValue>25</StatValue>
          </StatCard>
        </StatsGrid>
      </MainContent>
    </DashboardContainer>
  );
}
