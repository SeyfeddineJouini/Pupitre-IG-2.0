import React, { useState } from 'react';

export default function BilanRessourcesAccordiantComponent() {
  // État pour contrôler si le contenu de l'accordéon est affiché
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour basculer l'état isOpen
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2
        onClick={toggleOpen}
        className="flex items-center justify-between text-xl font-semibold cursor-pointer bg-green-500 text-white p-4 rounded-t-lg"
      >
        <span>{isOpen ? "-" : "+"} Références</span>
      </h2>
      {isOpen && (
        <div className="border p-4 rounded-b-lg border-green-500 pt-2">
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.ghgsat.com/fr/medias/quelles-sont-les-principales-emissions-de-co2-par-source/"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Quelles sont les principales émissions de CO2 par source ? -
                GHGSat
              </a>
            </li>

            <li>
              <a
                href="https://www.statistiques.developpement-durable.gouv.fr/edition-numerique/chiffres-cles-du-climat-2022/23-quelques-facteurs-demissions"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Quelques facteurs d’émissions | Chiffres clés du climat 2022
                (developpementdurable.gouv.fr)
              </a>
            </li>
            <li>
              <a
                href="https://leshorizons.net/2tonnes-atelier-former-professionnels-transition-ecologique/"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                2tonnes, un atelier pour former les professionnels à la transition écologique
              </a>
            </li>
            <li>
              <a
                href="https://www.vie-publique.fr/eclairage/290911-chronologie-du-changement-climatique-dorigine-humaine"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                Chronologie du changement climatique d'origine humaine | vie-publique.fr
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

