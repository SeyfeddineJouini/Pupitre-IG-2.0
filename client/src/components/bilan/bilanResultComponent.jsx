import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import NavbarAdmin from "../NavbarAdmin";
import { useAuth } from "../../context/AuthContext";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import BilanRessourcesAccordiantComponent from "./bilanRessourcesAccordiantComponent";
import InputComponent from "./inputComponent";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../themes';
import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaCheckCircle, FaExclamationCircle, FaCar, FaHome, FaUtensils, FaBox } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
  max-width: 1200px;
  width: 100%;
  animation: ${fadeIn} 2s ease-in-out;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Title = styled.h1`
  font-family: 'Outfit', Helvetica, sans-serif;
  font-weight: 700;
  color: #333;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-family: 'Open Sans', Helvetica, sans-serif;
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

const Column = styled.div`
  flex: 1;
  background: ${props => props.bg || '#f0f0f0'};
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: #ff6f61;
  margin-bottom: 10px;
`;

const EmailContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Transport':
      return <FaCar />;
    case 'Logement':
      return <FaHome />;
    case 'Alimentation':
      return <FaUtensils />;
    case 'Divers':
      return <FaBox />;
    default:
      return null;
  }
};

const BilanResultComponent = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  // const userName = props.userName || "";
  const questionResponse = props.questionResponse || {};

  const emailRegex = /\S+@\S+\.\S+/;

  const [reponse, setReponse] = useState(null);
  const [donneesChart, setDonneesChart] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailSentError, setEmailSentError] = useState(false);
  const [emailReset, setEmailReset] = useState(true);
  const [mailIsValid, setMailIsValid] = useState(null);
  const { isAuthenticated } = useAuth();
  const [theme, setTheme] = useState(lightTheme);

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
        onHover: function(e) {
          e.native.target.style.cursor = 'pointer';
        }
      }
    }
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
          labels: donnees.result?.map(item => item.label),
          datasets: [
            {
              data: donnees.result?.map(item => item.value),
              backgroundColor: donnees.result?.map(item => item.color),
              hoverOffset: 4,
            },
          ],
        });
        const score= donnees?.result?.map((item) => item.value).reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

        await addStat(
          questionResponse["nom"],
          score,
          questionResponse["specialite"],
          donnees.result.find((item) => item.id === "transport").value.toString(),
          donnees.result.find((item) => item.id === "alimentation").value.toString(),
          donnees.result.find((item) => item.id === "logement").value.toString(),
          donnees.result.find((item) => item.id === "divers").value.toString()
        );
      } catch (erreur) {
        console.error("Erreur lors de l’appel au backend:", erreur);
      }
    };

    appelerBackend();
  }, [questionResponse]); 

  function handleMailChange(newValue) {
    setEmailSent(false);
    setEmail(newValue.email);
    setMailIsValid(null);
  }

  async function sendEmail() {
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
          resultResponse: reponse
        }),
      });
      if (!res.ok) {
        setEmailSentError(true);
        setEmailReset(true);
        return;
      }
      const resultatEmail = await res.json();
      setEmailSent(resultatEmail.success);
      setEmail('');
      setEmailReset(true);
    } else {
      setMailIsValid(false);
    }
  }

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        {isAuthenticated ? <NavbarAdmin /> : <Navbar toggleTheme={toggleTheme} />}
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
                        }, 0)}
                    </span>
                    <Subtitle>TCO2e/an</Subtitle>
                  </div>
                  <div className="mx-auto mt-3 w-1/2">
                    <Doughnut data={donneesChart} options={options} />
                  </div>
                </div>
                <ResultContainer>
                  {reponse?.result?.map((result, index) => (
                    <div className="flex items-center" key={"result-" + index}>
                      <IconWrapper>
                        {getCategoryIcon(result.label)}
                      </IconWrapper>
                      <Subtitle>
                        {result.label} - {result.value} TCO2e/an
                      </Subtitle>
                    </div>
                  ))}
                </ResultContainer>
              </Column>

              <Column bg="#f0f0f0">
                <Title>Taux d’émission du salaire</Title>
                <Subtitle>
                  Avec un budget de <b>{questionResponse["budget"]} euros</b> par an,
                  votre émission est équivalente à
                </Subtitle>
                <Subtitle>
                  {reponse.budget?.toFixed(3).replace(".", ",")} TCO2
                </Subtitle>
                <p className="text-blue-300 text-justify" style={{ color: '#3a4e6b' }}>
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
                  <Title>Souhaitez-vous recevoir les résultats par courrier électronique?</Title>
                  <Subtitle>
                    Si l'on zoom sur l'empreinte carbone de l'email moyen, voilà ce que cela donne : 0,3 grammes pour un email de spam. 4 grammes pour un mail sans pièce jointe. 11 grammes pour un email avec une pièce jointe de 1 MB
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
                    onClick={sendEmail}
                    className="px-6 py-2 rounded bg-blue-500 text-white font-semibold"
                  >
                    Envoyer résultat par E-mail
                  </button>
                </div>
                {mailIsValid === false && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Votre adresse email <b>{email}</b> est invalide, Merci de verifier votre adresse.
                  </div>
                )}
                {emailSent && (
                  <div className="my-2 text-center text-green-700">
                    <FaCheckCircle /> Le résultat a été transmis par e-mail avec succès sur l'adresse <b>{email}</b>. Merci de vérifier votre e-mail!
                  </div>
                )}
                {emailSentError && (
                  <div className="my-2 text-center text-red-700">
                    <FaExclamationCircle /> Une erreur s'est produite lors de l'envoi d'email. Veuillez contacter un administrateur ou essayer à nouveau.
                  </div>
                )}

                <BilanRessourcesAccordiantComponent />
              </Column>
            </Section>
          )}
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default BilanResultComponent;
