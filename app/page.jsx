"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  router.push("/login");

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Mon Site</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-700 hover:text-blue-500">Accueil</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500">À propos</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-500">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Section d'accueil */}
      <section className="flex flex-col items-center text-center mt-10">
        <h2 className="text-4xl font-bold text-gray-800">Bienvenue sur Mon Site</h2>
        <p className="text-gray-600 mt-2">Explorez et découvrez nos services.</p>
        <a 
          href="#" 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Découvrir
        </a>
      </section>

      {/* Section À propos */}
      <section className="mt-10 bg-white shadow-md p-6 rounded-lg w-3/4">
        <h3 className="text-2xl font-semibold text-gray-800">À propos</h3>
        <p className="text-gray-600 mt-2">
          Nous sommes une entreprise dédiée à fournir des solutions innovantes pour nos clients.
        </p>
      </section>
    </main>
  );
}

