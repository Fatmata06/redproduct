'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => { 
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('⚠️ Accès refusé. Veuillez vous connecter.');
        alert("token not found");
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          toast.error('⚠️ Session expirée. Veuillez vous reconnecter.');
          alert("token expired");
          localStorage.removeItem('token');
          router.push('/login');
        }
      } catch (error) {
        toast.error('❌ Erreur de vérification du token.');
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);

  return isAuthenticated;
}
