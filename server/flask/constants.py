# Coefficients de CO2 en kgCO2/Km et kgCO2/an pour le transport
CO2_TRANSPORT_COMMUN = 0.108
CO2_VOITURE = 0.215
CO2_AVION = 0.259
CO2_TGV = 0.03
WEEKS_PER_YEAR = 52

# Coefficients de CO2 pour l'alimentation
CO2_VEGAN = 380  # Taux de CO2 émis par an pour une alimentation sans viande rouge
CO2_VIANDE_1_2 = 600  # Taux de CO2 émis par an pour consommation de viande rouge 1 à 2 fois par semaine
CO2_VIANDE_3_4 = 1200  # Taux de CO2 émis par an pour consommation de viande rouge 3 à 4 fois par semaine
CO2_VIANDE_PLUS_4 = 1800  # Taux de CO2 émis par an pour consommation de viande rouge plus de 4 fois par semaine

# Coefficients de CO2 pour les boissons
CO2_CAFE = 87.912  # Taux de CO2 émis par an pour consommation de café
CO2_THE = 1.2  # Taux de CO2 émis par an pour consommation de thé
CO2_EAU_ROBINET = 0  # Taux de CO2 émis par an pour consommation d'eau du robinet
CO2_EAU_BOUTEILLE = 97.455  # Taux de CO2 émis par an pour consommation d'eau en bouteille
CO2_CHOCOLAT = 120.56  # Taux de CO2 émis par an pour consommation de chocolat

# Coefficients de CO2 pour les services divers
# Coefficients de CO2 pour les vêtements (kg CO2/an)
CO2_VETEMENTS_MOINS_2 = 111.66  # Moins de 2 vêtements par mois
CO2_VETEMENTS_2_5 = (111.66 + 279.15) / 2  # Moyenne pour entre 2 et 5 vêtements par mois
CO2_VETEMENTS_PLUS_5 = 279.15  # Plus de 5 vêtements par mois

CO2_INTERNET_3H = 50  # Taux de CO2 émis par an pour utilisation d'internet moins de 3 heures par jour
CO2_INTERNET_6_10H = 150  # Taux de CO2 émis par an pour utilisation d'internet entre 6 et 10 heures par jour
CO2_INTERNET_PLUS_10H = 300  # Taux de CO2 émis par an pour utilisation d'internet plus de 10 heures par jour

CO2_FIXE_SERVICES = 2000  # Valeur fixe de CO2 pour les services divers tels que la santé, l'éducation, l'armée, etc.

# Émissions de CO₂ par type de chauffage (kg CO₂/an)
CO2_ELEC_MAIS = 178
CO2_ELEC_APPS = 237
CO2_ELEC_APPC = 355

CO2_GAZ_MAIS = 585
CO2_GAZ_APPS = 780
CO2_GAZ_APPC = 1170

CO2_FIOUL_MAIS = 857
CO2_FIOUL_APPS = 1143
CO2_FIOUL_APPC = 1715

# Émissions de CO₂ par état du logement (multiplicateur)
CO2_LOGREC = 1  # pour le logement récent
CO2_LOGANC = 2  # pour le logement ancien

# Pourcentage d'utilisation par les Français
PERC_ELEC = 0.40
PERC_GAZ = 0.32
PERC_FIOUL = 0.20

# Coefficients de CO2 pour les équipements électroménagers (kg CO2/an)

CO2_EMISSIONS = {
        "Four": 21.922,
        "Réfrigérateur": 32.5461,
        "Aspirateur": 47.31,
        "Lave-linges": 51.0257,
        "sèche-linges": 51.0257,
        "Lave-vaisselles": 46.7998,
        "TV": 60.05,
        "Smartphone": 33.67,
        "Ordinateurs/PC": 43.76
}
