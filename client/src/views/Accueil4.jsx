import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import { useAuth } from "../context/AuthContext";
import { useNavigate} from 'react-router-dom';

export const Accueil4 = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBilanNormal = async () => {
    navigate('/bilan/normal');
  }


  return (
    <>
    {isAuthenticated ? <NavbarAdmin /> : <Navbar />}
    <main>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            minHeight: "75vh"
          }}>
        <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
            
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto ">
                <div className="pr-12">
                  <h1 className="[font-family:'Outfit',Helvetica] font-medium text-black tracking-[0] leading-[normal] whitespace-nowrap text-6xl">
                    Bilan Carbone
                  </h1>
                  <p className="mt-4 text-lg [font-family:'Open_Sans',Helvetica] font-normal text-black tracking-[0] leading-[40px]">
                    Découvrez notre interface web révolutionnaire pour calculer votre Bilan Carbone, fruit d'un travail collectif et d'une synergie entre notre équipe et des étudiants en énergétique.
                  </p>
                </div>
                <div className="flex flex-wrap mt-5">
                  <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <img
                              className=""
                              alt="Fast delivery"
                              src="https://c.animaapp.com/VcwknbTN/img/fast-delivery-2@2x.png"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">Express</h6>
                        <p className="mt-2 mb-4 text-gray-600">
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full pt-6 md:w-4/12 px-4 text-center" onClick={handleBilanNormal}>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                        <img
                              className=""
                              alt="Time"
                              src="https://c.animaapp.com/VcwknbTN/img/time-2@2x.png"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">
                          Normal
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                          <img
                                className=""
                                alt="Hourglass"
                                src="https://c.animaapp.com/VcwknbTN/img/hourglass-2@2x.png"
                            />
                        </div>
                        <h6 className="text-xl font-semibold">
                          Long
                        </h6>
                        <p className="mt-2 mb-4 text-gray-600">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-5/12 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-600">
              <iframe 
              width="100%" 
              height="600px" 
              frameborder="0" 
              scrolling="yes" 
              marginheight="" 
              marginwidth="" 
              src="https://www.francetvinfo.fr/monde/environnement/crise-climatique/empreinte-carbone/">

              </iframe>
                <blockquote className="relative p-6 mb-2">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block"
                    style={{
                      height: "95px",
                      top: "-94px"
                    }}
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-pink-600 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-black">
                    Actualités
                  </h4>
                </blockquote>
              </div>
            </div>
            </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      
    </main>
    
  </>  
  );
};
