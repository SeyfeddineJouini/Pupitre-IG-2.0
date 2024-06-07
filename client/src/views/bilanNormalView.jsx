import React, {useState} from "react";
import BilanComponent from "../components/bilan/bilanComponent";
import BilanResultComponent from "../components/bilan/bilanResultComponent";
import Habit from "../img/vet.png";
import Vegetarien from "../img/vege.png";
import Transport from "../img/transport.png";
import TGV from "../img/tgv.png";
import Logement from "../img/loge.png";
import Internet from "../img/internet.png";
import Spe from "../img/interog.png";
import VoitureVac from "../img/grandep.png";
import Express from "../img/Express.png";
import Electro from "../img/electro.png";
import Eau from "../img/eau.png";
import Chauffage from "../img/chaff.png";
import Boisson from "../img/bois.png";
import Avion from "../img/avion.png";
import Voiture from "../img/voiture.png";
import Budget from "../img/budg.png";

export default function BilanExpressView() {
  let welcomePageContent = {
    title: "Bilan carbone en 3 minutes",
    description: "Le bilan carbone express vous aide à mesurer vos émissions de CO2 en explorant vos habitudes de transport, de logement, d'alimentation et de consommation.",
    image: Express,
  };



  let questionsList = [
    {
      id: "transport",
      type: "radio",
      title: "Pour vous rendre sur votre lieu de travail, à l'université ou à l'école, comment vous déplacez-vous ?",
      description: "",
      image: Transport,
      option: [
        {
          title: "Transports en commun (Bus, Tram, RER, Métro)",
          value: "transports_commun",
          subQuestion: [
            {
              id: "transport_commun_aller_retour",
              title: "Combien de kilomètres aller-retour avec les transports en commun ? ",
              type: "number",
              description: "",
            },
          ]
          },


        {
          title: "Vélo, de la marche à pied ",
          value: "velo/pied",
        },
        {
          title: "Voiture",
          value: "voiture",
          subQuestion: [
            {
              id: "voiture_coivoiturage",
              title: "Faites-vous du Covoiturage ?",
              type: "radio",
              description: "",
              option: [
                {
                  title: "Oui",
                  value: "oui",
                  subQuestion: [
                    {
                      id: "voiture_covoiturage_personne",
                      title: "Avec combien de personnes en général ?",
                      type: "number",
                      description: "",
                    }
                  ]
                },
                {
                  title: "Non",
                  value: "non"
                }
              ]
            },
            {
              id: "voiture_km",
              title: "Combien de kilomètres aller-retour avec la voiture ?",
              type: "number",
              description: "",
            },
          ]
        },
      ],
    },
    {
      id: 'transport_weekend',
      title: 'Pour vos déplacements du week-end, quel mode de transport privilégiez-vous ?',
      type: "radio",
      description: "",
      image: Voiture,
      option: [
        {
          title: "Transports en commun (Bus, Tram, RER, Métro)",
          value: "transports_weekend_commun",
          subQuestion: [
            {
              id: "transport_weekend_commun_aller_retour",
              title: "Combien de kilomètres aller-retour avec les transports en commun ?",
              type: "number",
              description: "",
            },
          ]
        },
        {
          title: "Vélo, de la marche à pied ",
          value: "velo/pied",
        },
        {
          title: "Voiture",
          value: "voiture",
          subQuestion: [
            {
              id: "voiture_weekend_coivoiturage",
              title: "Faites-vous du Covoiturage ?",
              type: "radio",
              description: "",
              option: [
                {
                  title: "Oui",
                  value: "oui",
                  subQuestion: [
                    {
                      id: "voiture_weekend_covoiturage_personne",
                      title: "Avec combien de personnes en général ?",
                      type: "number",
                      description: "",
                    }
                  ]
                },
                {
                  title: "Non",
                  value: "non"
                }
              ]
            },
            {
              id: "voiture_weekend_km",
              title: "Combien de kilomètres aller-retour avec la voiture ?",
              type: "number",
              description: "",
            },
          ]
        },
      ],
    }, {
        id: "destination_vacances",
        title: "Quelle est la destination de vos vacances principales ?",
        type: "radio",
        description: "",
        image: VoitureVac,
        option: [
            { title: "Local (moins de 100 km)", value: "local" },
            { title: "National", value: "national" },
            { title: "International (Europe)", value: "international_europe" },
            { title: "International (hors Europe)", value: "international_hors_europe" }
        ]
    },
    {
      id: "grand_deplacement_avion",
      title: "Pour les grands déplacements, prenez-vous l'avion ?",
      type: "radio",
      description: "",
      image: VoitureVac,
      option: [
        {
          title: "Oui",
          value: "oui",
          subQuestion: [
            {
              id: "grand_deplacement_avion_km",
              title: "Combien de kilomètres parcourez-vous en moyenne par an (aller-retour) en avion ? (PS : Paris-Lyon : 5 834 km)",
              type: "number"
            },
             {
               id: "Voyages_avion",    
               title: "Combien de voyages en avion faites-vous par an ?",
               type: "number",
               description: "",
               image: Avion
           }]
        },
        {
          title: "Non",
          value: "non"
        }
      ]
    },
    {
        id: "grand_deplacement_train",
        title: "Pour les grands déplacements, voyagez-vous en TGV ?",
        type: "radio",
        description: "",
        image:TGV,
        option: [
            {
                title: "Oui",
                value: "oui",
                subQuestion: [
                    {
                        id: "grand_deplacement_train_km",
                        title: "Combien de kilomètres parcourez-vous en moyenne par an (aller-retour) en train ? （PS）Paris-Lyon:391 km ",
                        type: "number"
                    }
                ]
            },
            {
                title: "Non",
                value: "non"
            }
        ]
    },  
    {
        id: "grand_deplacement_voiture",
        title: "Pour les grands déplacements, prenez-vous la voiture ?",
        type: "radio",
        description: "",
        image:Avion,
        option: [
            {
                title: "Oui",
                value: "oui",
                subQuestion: [
                    {
                        id: "voiture_grand_deplacement_coivoiturage",
                        title: "Faites-vous du Covoiturage ?",
                        type: "radio",
                        description: "",
                        option: [
                            {
                                title: "Oui",
                                value: "oui",
                                subQuestion: [
                                    {
                                        id: "voiture_grand_deplacement_covoiturage_personne",
                                        title: "Avec combien de personnes en général ?",
                                        type: "number",
                                        description: "",
                                    }
                                ]
                            },
                            {
                                title: "Non",
                                value: "non"
                            }
                        ]
                    },
                    {
                        id: "voiture_grand_deplacement_km",
                        title: "Combien de kilomètres parcourez-vous en moyenne par an (aller-retour) uniquement pour les vacances ? ",
                        type: "number",
                        description: "",
                    },
                ]
            },
            {
                title: "Non",
                value: "non"
            }
        ]
    },
    {
        id: "logement",
        type: "radio",
        title: "Quel est le type de votre logement ?",
        description: "",
        image: Logement,
        option: [
            {
                title: "Dans une maison en colocation ",
                value: "Dans une maison en colocation ",
                subQuestion: [
                    {
                        id: "logement_récent",
                        title: "Votre logement est-il récent (Construit après les années 2000) ?",
                        type: "radio",
                        description: "",
                        option: [
                            {
                                title: "Oui",
                                value: "oui",
                            },
                            {
                                title: "Non",
                                value: "non"
                            }
                        ]    
                    }
                ]
            },
            {
                title: "Dans un appartement en colocation  ",
                value: "Dans un appartement en colocation ",
                subQuestion: [
                    {
                        id: "logement_récent",
                        title: "Votre logement est-il récent (Construit après les années 2000) ?",
                        type: "radio",
                        description: "",
                        option: [
                            {
                                title: "Oui",
                                value: "oui",
                            },
                            {
                                title: "Non",
                                value: "non"
                            }
                        ]    
                    }
                ]
            },
            {
                title: "Seul(e) dans un appartement ",
                value: "Seul(e) dans un appartement ",
                subQuestion: [
                    {
                        id: "logement_récent",
                        title: "Votre logement est-il récent (Construit après les années 2000) ?",
                        type: "radio",
                        description: "",
                        option: [
                            {
                                title: "Oui",
                                value: "oui",
                            },
                            {
                                title: "Non",
                                value: "non"
                            }
                        ]    
                    }
                ]
            },
        ],
      },
    {
        id: "logement_chauffage",
        type: "radio",
        title: "Comment votre logement est-il chauffé ?",
        description: "",
        image: Chauffage,
        option: [
            {
                title: "Fioul",
                value: "Fioul",
            },
            {
                title: "Gaz",
                value: "Gaz",
            },
            {
                title: "Electricité",
                value: "Electricité",
            },
            {
              title: "Je ne sais pas",
              value: "Je ne sais pas",
          },
            
        ],
    },
    {
        id: "logement_equipements",
        type: "checkbox",
        title: "Quels équipements électroménagers utilisez-vous parmi les suivants ?",
        description: "",
        image: Electro,
        option: [
            {
                title: "Four",
                value: "Four",
            },
            {
                title: "Réfrigérateur",
                value: "Réfrigérateur",
            },
            {
                title: "Aspirateur",
                value: "Aspirateur",
            },
            {
                title: "Lave-linges",
                value: "Lave-linges",
            },
            {
                title: "Sèche-linge",
                value: "sèche-linges",
            },
            {
                title: "Lave-vaisselle",
                value: "Lave-vaisselles",
            },
            {
                title: "TV",
                value: "TV",
            },
            {
                title: "Smartphone",
                value: "Smartphone",
            },
            {
                title: "Ordinateurs/PC",
                value: "Ordinateurs/PC",
            },
        ],
      },
      {
          id: "achats_responsables",
          title: "À quelle fréquence achetez-vous des produits issus du commerce équitable ou respectueux de l'environnement ?",
          type: "radio",
          description: "",
          image: Budget,
          option: [
              { title: "Très souvent", value: "tres_souvent" },
              { title: "Souvent", value: "souvent" },
              { title: "Parfois", value: "parfois" },
              { title: "Rarement", value: "rarement" }
          ]
      },
      
      {
          id: "produits_locaux",
          title: "Quelle proportion de vos aliments provient de sources locales ?",
          type: "radio",
          description: "",
          image: Spe,
          option: [
              { title: "Moins de 25%", value: "moins_25" },
              { title: "25-50%", value: "25_50" },
              { title: "50-75%", value: "50_75" },
              { title: "Plus de 75%", value: "plus_75" }
          ]
      } ,
    {
        id: "régime_alimentaire",
        title: "Êtes-vous végétarien ?",
        type: "radio",
        description: "",
        image:Vegetarien,
        option: [
            {
                title: "Non",
                value: "non",
                subQuestion: [
                    {
                        id: "consommation_viande_rouge",
                        title: "À quelle fréquence consommez-vous de la viande rouge ?",
                        type: "radio",
                        description: "",
                        option: [
                            {
                                title: "1 à 2 fois par semaine",
                                value: "1 à 2 fois par semaine",
                            },
                            {
                                title: "3 à 4 fois par semaine",
                                value: "3 à 4 fois par semaine"
                            },
                            {
                                title: "Plus de 4 fois par semaine",
                                value: "Plus de 4 fois par semaine"
                            }
                        ]
                    },
                ]
            },
            {
                title: "Oui",
                value: "oui"
            }
        ]
      },
      {
          id: "alimentation_proteine",
          title: "Quelle est votre principale source de protéines ?",
          type: "radio",
          description: "",
          image: Vegetarien,
          option: [
              { title: "Viande rouge", value: "viande_rouge" },
              { title: "Volaille", value: "volaille" },
              { title: "Poisson", value: "poisson" },
              { title: "Végétarien (tofu, légumineuses, etc.)", value: "vegetarien" }
          ]
      },
      {
          id: "repas_a_emporter",
          title: "À quelle fréquence achetez-vous des repas à emporter ou utilisez-vous des services de livraison de nourriture ?",
          type: "radio",
          description: "",
          image: Spe,
          option: [
              { title: "Tous les jours", value: "tous_les_jours" },
              { title: "Plusieurs fois par semaine", value: "plusieurs_fois_par_semaine" },
              { title: "Une fois par semaine", value: "une_fois_par_semaine" },
              { title: "Moins d'une fois par semaine", value: "moins_d_une_fois_par_semaine" }
          ]
      },
    {
        id: "Alimentation_eau",
        type: "radio",
        title: "Buvez-vous généralement de l'eau du robinet ou de l'eau en bouteille ?",
        description: "",
        image:Eau,
        option: [
            {
                title: "Eau du robinet",
                value: "Eau du robinet",
            },
            {
                title: "Eau en bouteille",
                value: "Eau en bouteille",
            },
        ],
    },
    {
        id: "Alimentation_Boissons",
        type: "checkbox",
        title: "Quelles boissons chaudes consommez-vous ? ",
        description: "",
        image: Boisson,
        option: [
            {
                title: "Café",
                value: "Café",
            },
            {
                title: "Thé",
                value: "Thé",
            },
            {
                title: "Chocolat",
                value: "Chocolat",
            },
        ],
    },
    {
        id: "divers_textile",
        type: "radio",
        title: "En moyenne, combien de vêtements achetez-vous par mois ?",
        description: "",
        image: Habit,
        option: [
            {
                title: "Entre 1 et 2",
                value: "Entre 1 et 2",
            },
            {
                title: "Entre 3 et 5",
                value: "Entre 3 et 5",
            },
            {
                title: "Plus de 5",
                value: "Plus de 5",
            },
        ],
    },
    {
        id: "achat_electronique",
        title: "À quelle fréquence achetez-vous de nouveaux appareils électroniques (téléphones, ordinateurs, etc.) ?",
        type: "radio",
        description: "",
        image: Electro,
        option: [
            { title: "Tous les ans", value: "annuel" },
            { title: "Tous les 2-3 ans", value: "deux_trois_ans" },
            { title: "Tous les 4-5 ans", value: "quatre_cinq_ans" },
            { title: "Moins fréquemment", value: "moins_freq" }
        ]
    },
    {
        id: "pratiques_deconnexion",
        title: "Avez-vous des pratiques régulières pour réduire l'utilisation de vos appareils électroniques (journées sans écran, etc.) ?",
        type: "radio",
        description: "",
        image: Electro,
        option: [
            { title: "Oui", value: "oui" },
            { title: "Non", value: "non" }
        ]
    },
    {
        id: "divers_internet",
        type: "radio",
        title: "À combien s’élève en moyenne le nombre d’heures que vous passez sur Internet par jour ?",
        description: "",
        image:Internet,
        option: [
            {
                title: "Moins de 3 heures",
                value: "Moins de 3 heures",
            },
            {
                title: "Entre 6 et 10 heures",
                value: "Entre 6 et 10 heures",
            },
            {
                title: "Plus de 10 heures",
                value: "Plus de 10 heures",
            },
        ],
      },
      {
          id: "initiatives_ecologiques",
          title: "Participez-vous à des initiatives écologiques (nettoyage de plages, plantation d'arbres, etc.) ?",
          type: "radio",
          description: "",
          image: Spe,
          option: [
              { title: "Oui, régulièrement", value: "oui_regulier" },
              { title: "Oui, occasionnellement", value: "oui_occasionnel" },
              { title: "Non", value: "non" }
          ]

      },
      {
          id: "tri_dechets",
          title: "Faites-vous le tri sélectif de vos déchets ?",
          type: "radio",
          description: "",
          image: Spe,
          option: [
              { title: "Oui", value: "oui" },
              { title: "Non", value: "non" }
          ]
      },
      {
          id: "teletravail",
          title: "Combien de jours par semaine travaillez-vous à domicile (télétravail) ?",
          type: "number",
          description: "",
          image: Internet
      },
      {
          id: "jardin_potager",
          title: "Avez-vous un jardin potager pour cultiver vos propres légumes et fruits ?",
          type: "radio",
          description: "",
          image: Spe,
          option: [
              { title: "Oui", value: "oui" },
              { title: "Non", value: "non" }
          ]
      },{
          id: "sources_energie_renouvelable",
          title: "Avez-vous installé des sources d'énergie renouvelable chez vous (panneaux solaires, éoliennes, etc.) ?",
          type: "radio",
          description: "",
          image: Electro,
          option: [
              { title: "Oui", value: "oui" },
              { title: "Non", value: "non" }
          ]
      },
      {
          id: "utilisation_streaming",
          title: "À quelle fréquence utilisez-vous des services de streaming vidéo (Netflix, YouTube, etc.) ?",
          type: "radio",
          description: "",
          image: Internet,
          option: [
              { title: "Tous les jours", value: "tous_les_jours" },
              { title: "Plusieurs fois par semaine", value: "plusieurs_fois_par_semaine" },
              { title: "Une fois par semaine", value: "une_fois_par_semaine" },
              { title: "Moins d'une fois par semaine", value: "moins_d_une_fois_par_semaine" }
          ]
      },
    {
        id: "budget",
        title: "Quels sont vos revenus/dépenses mensuels ?",
        type: "number",
        min: 0, // Added min attribute to prevent negative values
        description: "",
        image: Budget,
    },
    {
        image: Spe,
        list: [
            {
                id: "nom",
                title: "Quelle est votre Nom ?",
                type: "text",
                description: "",
                optional: true
            },
            {
                id: "specialite",
                title: " Quelle est votre specialité ?",
                type: "radio",
                description: "",
                option: [
                    {
                        title: "ING INFO",
                        value: "ING INFO",
                    },
                    {
                        title: "ING ENER",
                        value: "ING ENER",
                    },
                    {
                        title: "ING INSTRU",
                        value: "ING INSTRU",
                    },
                    {
                        title: "ING MACS",
                        value: "ING MACS",
                    },
                    {
                        title: "ING TELECOM",
                        value: "ING TELECOM",
                    },
                    {
                        title: "Autres",
                        value: "Autres",
                    },
                ]
            },
        ]
    }
];

    const [userName, setUserName] = useState('');
    const [response, setResponse] = useState({});
    const [showResult, setShowResult] = useState(false);

    function handleResponseChange(value) {
        setResponse({...response, ...value});
    }

    function handleTerminateChange(value) {
        setShowResult(true);
    }

    return (
      <div>
        {showResult === false && (
          <BilanComponent
            userName={userName}
            questionsList={questionsList}
            welcomeContent={welcomePageContent}
            onResponseChange={handleResponseChange}
            onTerminateClicked={handleTerminateChange}
          />
        )}

      

        {/* <hr />
        {JSON.stringify(response, null, 2)} */}
      </div>
    );
}