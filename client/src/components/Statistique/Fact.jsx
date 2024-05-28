import React, { useEffect, useState } from "react";
import axios from "axios";

const dailyFacts = [
    "L'écologie est l'étude des interactions entre les organismes et leur environnement.",
    "Les écosystèmes sont des systèmes complexes composés d'organismes vivants et de leur environnement physique.",
    "Les écosystèmes fournissent des services écologiques essentiels tels que la purification de l'eau, la pollinisation des cultures et la régulation du climat.",
    "La biodiversité est la variété des formes de vie sur Terre, et elle est essentielle à la stabilité des écosystèmes.",
    "Les forêts tropicales abritent plus de la moitié de la biodiversité mondiale, bien qu'elles ne couvrent que 6% de la surface de la Terre.",
    "Les océans fournissent plus de la moitié de l'oxygène de la planète et absorbent une grande partie du dioxyde de carbone produit par les activités humaines.",
    "La déforestation est l'une des principales causes de perte de biodiversité et de changement climatique.",
    "Les espèces exotiques envahissantes peuvent perturber les écosystèmes indigènes et menacer la biodiversité.",
    "Les zones humides, comme les marais et les mangroves, jouent un rôle crucial dans la filtration de l'eau et la protection des côtes contre les tempêtes.",
    "Les pollinisateurs, tels que les abeilles et les papillons, sont indispensables à la pollinisation des plantes, y compris de nombreuses cultures alimentaires.",
    "La surpêche menace la durabilité des stocks de poissons et la santé des écosystèmes marins.",
    "Les émissions de gaz à effet de serre, telles que le dioxyde de carbone et le méthane, contribuent au réchauffement climatique et aux changements climatiques.",
    "Le changement climatique entraîne des phénomènes météorologiques extrêmes plus fréquents, tels que les tempêtes, les inondations et les sécheresses.",
    "La fonte des glaciers et des calottes glaciaires due au réchauffement climatique entraîne une élévation du niveau de la mer, menaçant les régions côtières.",
    "L'agriculture intensive peut entraîner la dégradation des sols, la pollution de l'eau et la perte de biodiversité.",
    "Les énergies renouvelables, comme l'énergie solaire et éolienne, offrent des alternatives plus durables aux combustibles fossiles.",
    "La conservation des zones protégées, telles que les parcs nationaux et les réserves naturelles, est essentielle pour préserver la biodiversité et les écosystèmes.",
    "Les pratiques agricoles durables, telles que l'agroécologie et la permaculture, favorisent la santé des sols et la résilience des cultures.",
    "La réduction, le réutilisation et le recyclage des déchets sont des moyens efficaces de réduire l'empreinte écologique et de préserver les ressources naturelles.",
    "Les villes vertes, avec des espaces verts et des infrastructures durables, favorisent la qualité de vie et la santé des habitants.",
    "La connectivité écologique, c'est-à-dire la conservation des corridors biologiques, aide à prévenir l'isolement des populations animales et végétales.",
    "La restauration des écosystèmes dégradés, tels que les zones humides et les mangroves, peut contribuer à atténuer les effets du changement climatique.",
    "La collaboration internationale est essentielle pour résoudre les problèmes environnementaux mondiaux, tels que la pollution plastique et la perte de biodiversité.",
    "Les peuples autochtones jouent souvent un rôle crucial dans la conservation de la biodiversité et la gestion durable des ressources naturelles.",
    "La sensibilisation du public et l'éducation environnementale sont essentielles pour susciter un changement positif en matière de conservation.",
    "Les écosystèmes côtiers, tels que les récifs coralliens, sont particulièrement vulnérables aux effets du changement climatique et de la pollution.",
    "La déforestation contribue à la perte d'habitats pour de nombreuses espèces, ce qui peut entraîner leur extinction.",
    "Les zones urbaines peuvent être conçues pour favoriser la biodiversité, par exemple en intégrant des toits verts et des jardins communautaires.",
    "La surconsommation des ressources naturelles, associée à une croissance démographique rapide, exerce une pression importante sur les écosystèmes.",
    "La transition vers une économie circulaire, dans laquelle les déchets sont réduits au minimum et les ressources sont utilisées de manière plus efficace, est cruciale pour assurer la durabilité à long terme de notre planète.",
];

const MyFact = ({ apiUrl }) => {
    const [totalEmissions, setTotalEmissions] = useState(0);
    const [currentFact, setCurrentFact] = useState(dailyFacts[0]);

    useEffect(() => {
        const updateFact = () => {
            const randomIndex = Math.floor(Math.random() * dailyFacts.length);
            setCurrentFact(dailyFacts[randomIndex]);
        };

        updateFact(); // Initial call to set a random fact immediately

        const interval = setInterval(updateFact, 5 * 60 * 1000); // Update every 5 minutes

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/stats/api/statistiques/totalScore`)
            .then(response => setTotalEmissions(response.data.total))
            .catch(error => console.error("Error loading total emissions data:", error));
    }, [apiUrl]);

    return (
        <div>
            <p>{currentFact}</p>
        </div>
    );
};

export default MyFact;
