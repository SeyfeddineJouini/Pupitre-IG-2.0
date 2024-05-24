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
CO2_CAFE = 12.38  # Taux de CO2 émis par an pour consommation de café
CO2_THE = 18.25  # Taux de CO2 émis par an pour consommation de thé
CO2_EAU_ROBINET = 0  # Taux de CO2 émis par an pour consommation d'eau du robinet
CO2_EAU_BOUTEILLE = 7048.3  # Taux de CO2 émis par an pour consommation d'eau en bouteille


# Coefficients de CO2 pour les services divers
CO2_VETEMENTS_1_3 = 100  # Taux de CO2 émis par an pour achat de 1 à 3 vêtements par mois
CO2_VETEMENTS_4_8 = 200  # Taux de CO2 émis par an pour achat de 4 à 8 vêtements par mois
CO2_VETEMENTS_PLUS_8 = 400  # Taux de CO2 émis par an pour achat de plus de 8 vêtements par mois

CO2_INTERNET_3H = 500  # Taux de CO2 émis par an pour utilisation d'internet moins de 3 heures par jour
CO2_INTERNET_6_10H = 1500  # Taux de CO2 émis par an pour utilisation d'internet entre 6 et 10 heures par jour
CO2_INTERNET_PLUS_10H = 3000  # Taux de CO2 émis par an pour utilisation d'internet plus de 10 heures par jour

CO2_FIXE_SERVICES = 2000  # Valeur fixe de CO2 pour les services divers tels que la santé, l'éducation, l'armée, etc.

# Coefficients de CO2 pour le logement 
CO2_LOGREC = 60
CO2_LOGANC = 130
CO2_FIOUL=3602
CO2_GAZ = 2457
CO2_ELEC = 473
A_APPS = 20
A_MAIS = 15
A_APPC = 30
CO2_EMISSIONS = {
        "Four": 263,
        "Réfrigérateur": 325,
        "Aspirateur": 47.3,
        "Lave-linges": 510,
        "sèche-linges": 510,
        "Lave-vaisselles": 468,
        "TV": 425,
        "Smartphone": 38,
        "Ordinateurs/PC": 178
}