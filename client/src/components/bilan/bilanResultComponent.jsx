import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BilanRessourcesAccordiantComponent from "./bilanRessourcesAccordiantComponent";
import InputComponent from "./inputComponent";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../themes";
import {
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
  FaCar,
  FaHome,
  FaUtensils,
  FaBox,
} from "react-icons/fa";

import {
  MainContainer,
  ContentContainer,
  Section,
  Title,
  Subtitle,
  Column,
  IconWrapper,
  EmailContainer,
  ResultContainer,
  LegendItem,
  LegendColor,
  LegendIcon,
  LegendText,
} from "./stylesBilanResult";
import ModalComponent from "./ModalRappelEmailComponent";
ChartJS.register(ArcElement, Tooltip, Legend);

const BilanResultComponent = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const questionResponse = props.questionResponse || {};

  const emailRegex = /\S+@\S+\.\S+/;

  const [reponse, setReponse] = useState(null);
  const [donneesChart, setDonneesChart] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentError, setEmailSentError] = useState(false);
  const [emailReset, setEmailReset] = useState(true);
  const [mailIsValid, setMailIsValid] = useState(null);
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);
  const [showModal, setShowModal] = useState(false);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        display: false,
        onHover: function (e) {
          e.native.target.style.cursor = "pointer";
        },
      },
    },
  };

  const addStat = async (
    nom,
    score,
    specialite,
    transport,
    alimentation,
    logement,
    divers,
    mode = "Express"
  ) => {
    try {
      const res = await fetch(`${apiUrl}/stats/AddStats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom || "Anonyme",
          mode: mode,
          spe: specialite,
          scoreTotal: score,
          transport: transport,
          alimentation: alimentation,
          logement: logement,
          divers: divers,
        }),
      });
      if (!res.ok) {
        throw new Error("La requête au backend ajout statistique a échoué");
      }
    } catch (erreur) {
      console.error("Erreur lors de l’appel au backend - stat :", erreur);
    }
  };

  useEffect(() => {
    const appelerBackend = async () => {
      try {
        const res = await fetch(`${apiUrl}/quiz/calculate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionResponse),
        });
        if (!res.ok) {
          throw new Error("La requête au backend a échoué");
        }
        const donnees = await res.json();
        setReponse(donnees);
        setDonneesChart({
          labels: donnees.result?.map((item) => item.label),
          datasets: [
            {
              data: donnees.result?.map((item) => item.value),
              backgroundColor: donnees.result?.map((item) => item.color),
              hoverOffset: 4,
            },
          ],
        });
        const score = donnees?.result
          ?.map((item) => item.value)
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);

        await addStat(
          questionResponse["nom"],
          score,
          questionResponse["specialite"],
          donnees.result
            .find((item) => item.id === "transport")
            .value.toString(),
          donnees.result
            .find((item) => item.id === "alimentation")
            .value.toString(),
          donnees.result
            .find((item) => item.id === "logement")
            .value.toString(),
          donnees.result.find((item) => item.id === "divers").value.toString()
        );
      } catch (erreur) {
        console.error("Erreur lors de l’appel au backend:", erreur);
      }
    };

    appelerBackend();

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // Affiche le modal après 30 secondes

    return () => clearTimeout(timer);
  }, [questionResponse]);

  function handleMailChange(newValue) {
    setEmailSent(false);
    setEmail(newValue.email);
    setMailIsValid(null);
  }

  async function sendEmail(closeModal) {
    setEmailSentError(false);
    if (emailRegex.test(email)) {
      setMailIsValid(true);
      setEmailReset(false);
      const res = await fetch(`${apiUrl}/quiz/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          resultRequest: questionResponse,
          resultResponse: reponse,
        }),
      });
      if (!res.ok) {
        setEmailSentError(true);
        setEmailReset(true);
        return;
      }
      const resultatEmail = await res.json();
      setEmailSent(resultatEmail.success);
      setEmail("");
      setEmailReset(true);
      setTimeout(() => {
        closeModal();
      }, 2000); // Attend 5 secondes avant de fermer le modal
    } else {
      setMailIsValid(false);
    }
  }

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Transport":
        return <FaCar />;
      case "Logement":
        return <FaHome />;
      case "Alimentation":
        return <FaUtensils />;
      case "Divers":
        return <FaBox />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {isAuthenticated ? (
          <NavbarAdmin />
        ) : (
          <Navbar toggleTheme={toggleTheme} />
        )}
        <ContentContainer>
          {reponse === null && <Title>Loading ..... </Title>}
          {reponse && donneesChart && (
            <Section>
              <Column>
                <Title>Bilan carbone</Title>
                <div className="relative">
                  <div className="text-center">
                    <span className="text-6xl font-semibold">
                      {reponse?.result
                        ?.map((item) => item.value)
                        .reduce((accumulator, currentValue) => {
                          return accumulator + currentValue;
                        }, 0)
                        .toFixed(3)}
                    </span>
                    <Subtitle>TCO2e/an</Subtitle>
                  </div>
                  <div className="mx-auto mt-3 w-1/2">
                    <Doughnut data={donneesChart} options={options} />
                  </div>
                </div>
                <ResultContainer>
                  {reponse?.result?.map((result, index) => (
                    <LegendItem key={"result-" + index}>
                      <LegendColor style={{ backgroundColor: result.color }}>
                        <LegendIcon>{getCategoryIcon(result.label)}</LegendIcon>
                      </LegendColor>
                      <LegendText>
                        {result.label} - {result.value} TCO2e/an
                      </LegendText>
                    </LegendItem>
                  ))}
                </ResultContainer>
              </Column>

              <Column bg="#f0f0f0">
                <Title>Taux d’émission du salaire</Title>
                <Subtitle>
                  Avec un budget de <b>{questionResponse["budget"]} euros</b>{" "}
                  par an, votre émission est équivalente à
                </Subtitle>
                <b>{reponse.budget?.toFixed(3).replace(".", ",")} TCO2</b>
                <p>
                  Pour calculer le taux d’émission du salaire, nous avons
                  considéré d’une part, le budget annuel français qui est
                  d’environ 312 000 millions d’euros en 2024 et d’autre part, le
                  taux de CO2 émis par toute la France est de 604 millions de
                  tonne de CO2.
                </p>
              </Column>

              <Column bg="#e0f7fa">
                <EmailContainer>
                  <IconWrapper>
                    <FaEnvelope />
                  </IconWrapper>
                  <Title>
                    Souhaitez-vous recevoir les résultats par courrier
                    électronique?
                  </Title>
                  <Subtitle>
                    Si l'on zoom sur l'empreinte carbone de l'email moyen, voilà
                    ce que cela donne : 0,3 grammes pour un email de spam. 4
                    grammes pour un mail sans pièce jointe. 11 grammes pour un
                    email avec une pièce jointe de 1 MB
                  </Subtitle>
                </EmailContainer>

                <div className="space-x-4 justify-center text-center">
                  <div className="my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {emailReset && (
                      <InputComponent
                        question={{
                          id: "email",
                          type: "email",
                          title: "Votre addresse E-mail",
                        }}
                        inputType="email"
                        value={{ email: email }}
                        onValueChange={handleMailChange}
                      />
                    )}
                  </div>

                  <button
                    onClick={() => sendEmail(closeModal)}
                    className="px-6 py-2 rounded bg-blue-500 text-white font-semibold"
                  >
                    Envoyer résultat par E-mail
                  </button>
                </div>
                {mailIsValid === false && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Votre adresse email <b>{email}</b>{" "}
                    est invalide, Merci de verifier votre adresse.
                  </div>
                )}
                {emailSent && (
                  <div className="my-2 text-center text-green-700">
                    <FaCheckCircle /> Les résultats ont été envoyés avec succès
                    à l'adresse e-mail <b>{email}</b>. Veuillez vérifier votre
                    boîte de réception.
                  </div>
                )}
                {emailSentError && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Une erreur s'est produite lors de
                    l'envoi d'email. Veuillez contacter un administrateur ou
                    essayer à nouveau.
                  </div>
                )}

                <BilanRessourcesAccordiantComponent />
              </Column>
            </Section>
          )}
        </ContentContainer>
        {showModal && (
          <ModalComponent
            closeModal={closeModal}
            handleMailChange={handleMailChange}
            sendEmail={sendEmail}
            mailIsValid={mailIsValid}
            emailSent={emailSent}
            emailSentError={emailSentError}
            email={email}
            emailReset={emailReset}
          />
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default BilanResultComponent;
