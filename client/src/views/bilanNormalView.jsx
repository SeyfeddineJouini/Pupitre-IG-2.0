import React, {useState} from "react";
import BilanComponent from "../components/bilan/bilanComponent";
import BilanResultComponent from "../components/bilan/bilanResultComponent";

export default function BilanNormalView() {
    let welcomePageContent = {
        title: "Bilan carbone 5 minutes",
        description: "Le bilan carbone express vous aide à mesurer vos émissions de CO2 en explorant vos habitudes de transport, logement, alimentation et consommation.",
        image: "https://cdn.futura-sciences.com/sources/images/qr/Celine/Empreinte%20carbone%20%20cienpiesnf%20-%20Fotolia.jpg"
    };

    let questionsList = [
        {
            id: "transport",
            type: "radio",
            title: "Pour vous rendre sur votre lieu de travail ou Université / école, vous prenez ?",
            description: "",
            image: "https://i.familiscope.fr/2000x1125/smart/2023/11/06/coloriages-transports.jpg",
            option: [
                {
                    title: "Transports en commun (Bus, Tram, RER, Métro)",
                    value: "transports_commun",
                    subQuestion: [
                        {
                            id: "transport_commun_aller_retour",
                            title: "Combien de km Aller-Retour avec le transport en commun? ",
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
                            title: "Faites-vous du Co-Voiturage ?",
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
                            title: "Combien de km Aller-Retour avec la voiture ? ",
                            type: "number",
                            description: "",
                        },
                    ]
                },
            ],
        },
        {
            id: 'transport_weekend',
            title: 'Pour les déplacements du week-end, vous prenez ?',
            type: "radio",
            description: "",
            image: "https://thumbs.dreamstime.com/b/d%C3%A9placement-en-v%C3%A9hicule-p%C3%A8re-conduisant-la-voiture-vacances-d-%C3%A9t%C3%A9-heureuses-de-famille-tourisme-famille-de-personnage-de-78706435.jpg",
            option: [
                {
                    title: "Transports en commun (Bus, Tram, RER, Métro)",
                    value: "transports_weekend_commun",
                    subQuestion: [
                        {
                            id: "transport_weekend_commun_aller_retour",
                            title: "Combien de km Aller-Retour avec le transport en commun? ",
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
                            title: "Faites-vous du Co-Voiturage ?",
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
                            title: "Combien de km Aller-Retour avec la voiture ? ",
                            type: "number",
                            description: "",
                        },
                    ]
                },
            ],
        },
        {
            id: "grand_deplacement_avion",
            title: "Pour les grand déplacement prenez-vous l'avion ?",
            type: "radio",
            description: "",
            image: "https://media.istockphoto.com/id/155439315/fr/photo/avion-de-passagers-voler-au-dessus-des-nuages-au-coucher-du-soleil.jpg?s=612x612&w=0&k=20&c=LRxXZHvGfbWnAM_ELCPbFHI9gdqJXDRqIy3xOM7m5tg=",
            option: [
                {
                    title: "Oui",
                    value: "oui",
                    subQuestion: [
                        {
                            id: "grand_deplacement_avion_km",
                            title: "Combien de km parcourez-vous en moyenne par an (aller / retour) en avion? （PS）Paris-Lyon:5 834 km ",
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
            id: "grand_deplacement_train ",
            title: "Pour les grand déplacement voyagez-vous en TGV ?",
            type: "radio",
            description: "",
            image: "https://www.emploi-collectivites.fr/images/Image%20%20IFTP%20Indemnit%C3%A9%20frais%20transport%20des%20personnes.jpg",
            option: [
                {
                    title: "Oui",
                    value: "oui",
                    subQuestion: [
                        {
                            id: "grand_deplacement_train_km ",
                            title: "Combien de km parcourez-vous en moyenne par an (aller / retour) en train? （PS）Paris-Lyon:391 km ",
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
            title: "Pour les grand déplacement prenez-vous la voiture ",
            type: "radio",
            description: "",
            image: "https://www.locationvoituremaurice.com/images/blog/quel-vehicule-choisir.png",
            option: [
                {
                    title: "Oui",
                    value: "oui",
                    subQuestion: [
                        {
                            id: "voiture_grand_deplacement_coivoiturage",
                            title: "Faites-vous du Co-Voiturage ?",
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
                            title: "Combien de km parcourez-vous en moyenne par an (uniquement pour les vacances) (Aller-Retour) ? ",
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
            title: "Quelle est le type de votre logement ?",
            description: "",
            image: "https://www.roissyenbrie77.fr/wp-content/uploads/2017/08/logement.jpg",
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
            title: "Comment est chauffé votre logement ?",
            description: "",
            image: "https://cdn.v2.primesenergie.fr/images/header-img/chauffage-ecologique.jpg",
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
            ],
        },
        {
            id: "logement_equipements",
            type: "checkbox",
            title: "Quels sont vos équipements électroménagers ?",
            description: "",
            image: "https://lamaisonideale.fr/wp-content/uploads/2021/06/electromenagers-indispensables-appareils-maison-1200x900.jpg",
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
                    title: "sèche-linges",
                    value: "sèche-linges",
                },
                {
                    title: "Lave-vaisselles",
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
            id: "régime_alimentaire",
            title: "Etes-vous végétarien ?",
            type: "radio",
            description: "",
            image: "https://img.freepik.com/vecteurs-premium/illustration-vectorielle-dessin-anime-diner-savoureux-steak-porc-grille-legumes-vue-dessus-plaque_718601-62.jpg",
            option: [
                {
                    title: "Non",
                    value: "non",
                    subQuestion: [
                        {
                            id: "consommation_viande_rouge",
                            title: "A quelle fréquence consommez-vous la viande rouge ?",
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
            id: "Alimentation_eau",
            type: "radio",
            title: "Buvez-vous en général l’eau du robinet ou de l’eau en bouteille ?",
            description: "",
            image: "https://www.harmonie-sante.fr/sites/default/files/styles/big_picture/public/2021/03/eau-photo-principale.jpg?h=da777856&itok=UB1mwtLQ",
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
            title: "Quelles sont les boissons chaudes que vous consommez ? ",
            description: "",
            image: "https://cdn-icons-png.flaticon.com/512/325/325623.png",
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
            title: "Vous achetez en moyenne combien de vêtements par mois ?",
            description: "",
            image: "https://cdn.icon-icons.com/icons2/3150/PNG/512/clothing_shop_bag_tshirt_icon_192654.png",
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
            id: "divers_internet",
            type: "radio",
            title: "A combien s’élève en moyenne le nombre d’heure vous passez sur internet par jour ?",
            description: "",
            image: "https://www.afbshop.fr/media/43/57/68/1698068150/Comment%20am%C3%A9liorer%20sa%20connexion%20Internet.jpg",
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
            id: "budget",
            title: "Quelle estr votre budget mensuel ?",
            type: "number",
            description: "",
            image: "https://www.coindusalarie.fr/assets/static/12235-no6ahn.ad76ebb.f378cd6f0536cce77b3c4a3ba6377ed2.jpg",
        },
        {
            image: "https://static.wixstatic.com/media/c430c5_9a036bca709341be933e0fe08be29ac2~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c430c5_9a036bca709341be933e0fe08be29ac2~mv2.jpg",
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

        {showResult && (
          
          <BilanResultComponent
            userName={userName}
            questionResponse={response}
          />
        )}

        {/* <hr />
        {JSON.stringify(response, null, 2)} */}
      </div>
    );
}