import React from "react";
import BilanComponent from "../components/bilan/bilanComponent";

export default function BilanExpressView() {
    let userName = "wissal";
    let welcomePageContent = {
      title: "Test Bilan Express",
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page",
      image: "https://www.colibris-compression.fr/media/cache/default_product_large/media/porduits/20171208-livraison-express-v3-transparent-1024x1024-1.png"
    };
  
    let questionsList = [
      {
        image: "https://blog.educpros.fr/jean-charles-cailliez/files/2014/03/qcm.jpg",
        description: " description du question 1",
        title:
          "Pour vous rendre sur votre lieu de travail ou Université / école, vous prenez ?",
        type: "radio",
        option: [
          {
            title: "Transports en commun (Bus, Tram, RER, Métro)",
            value: "transports",
          },
          {
            title: "Vélo, de la marche à pied ",
            value: "velo/pied",
          },
          {
            title: "Voiture",
            value: "voiture",
          },
        ],
      },
      {
        image: "https://media.istockphoto.com/id/1302846377/vector/speech-bubble-with-question-mark-vector-illustration.jpg?s=612x612&w=0&k=20&c=IjtXw2DACsBELihPaovn9XUXcIWwjB8GP1D8EUC2QlA=",
        title:
          "Pour vous rendre sur votre lieu de travail ou Université / école, vous prenez ? / 2",
        type: "radio",
        option: [
          {
            title: "Transports en commun (Bus, Tram, RER, Métro)",
            value: "transports",
          },
          {
            title: "Vélo, de la marche à pied ",
            value: "velo/pied",
          },
          {
            title: "Voiture",
            value: "voiture",
          },
        ],
      },
    ];

    return (
      <BilanComponent
        userName={userName}
        questionsList={questionsList}
        welcomeContent={welcomePageContent}
      />
    );
}