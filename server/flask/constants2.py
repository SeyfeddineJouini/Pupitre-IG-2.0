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

# Constantes pour les heures de streaming par jour (en kg CO2 par an)
CO2_STREAMING_MOINS_30M = {
    'smartphone': {'wifi': 2.98, '4g_5g': 7.8},
    'ordinateur_portable': {'wifi': 3.085, '4g_5g': 7.9},
    'television': {'wifi': 3.3, '4g_5g': 8.1}
}

CO2_STREAMING_30M_3H = {
    'smartphone': {'wifi': 17.9 , '4g_5g': 46.7 },
    'ordinateur_portable': {'wifi': 18.5, '4g_5g': 47.4 },
    'television': {'wifi': 19.8, '4g_5g': 48.7}
}

CO2_STREAMING_3H_6H = {
    'smartphone': {'wifi': 46.2, '4g_5g': 121},
    'ordinateur_portable': {'wifi': 47.8, '4g_5g': 122},
    'television': {'wifi': 51.1, '4g_5g': 126}
}

CO2_STREAMING_PLUS_6H = {
    'smartphone': {'wifi': 83.4, '4g_5g': 218},
    'ordinateur_portable': {'wifi': 86.3, '4g_5g': 221},
    'television': {'wifi': 92.4, '4g_5g': 227}
}

# Constantes pour les heures passées sur les réseaux sociaux par jour (en kg CO2 par an)

# Pour moins de 30 minutes par jour (en moyenne 15 minutes par jour) :
# 15 minutes = 0.25 heures
# 15 minutes * 2.10 gEqCO2/minute = 31.5 gEqCO2/jour
# 31.5 gEqCO2/jour * 365 jours = 11 497.5 gEqCO2/an = 11.4975 kg CO2e/an
CO2_RESEAUX_SOCIAUX_MOINS_30M = 11.4975  # kg CO₂e par an pour moins de 30 minutes par jour
# Pour 30 minutes à 1 heure par jour (en moyenne 45 minutes par jour) :
CO2_RESEAUX_SOCIAUX_30M_1H = 34.4925  # kg CO₂e par an pour 30 minutes à 1 heure par jour
# Pour 1 à 2 heures par jour (en moyenne 1.5 heures par jour) :
CO2_RESEAUX_SOCIAUX_1H_2H = 68.985  # kg CO₂e par an pour 1 à 2 heures par jour
# Pour plus de 2 heures par jour (en moyenne 3 heures par jour) :
CO2_RESEAUX_SOCIAUX_PLUS_2H = 137.97  # kg CO₂e par an pour plus de 2 heures par jour

CO2_FIXE_SERVICES = 1800  # Valeur fixe de CO2 pour les services divers tels que la santé, l'éducation, l'armée, etc.

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
################################### Ajout ENER AP
#Alimentation Prot
CO2_VIANDE_ROUGE = 1200
CO2_VOLAILLE = 600
CO2_POISSON = 375
CO2_VEGE = 380
#Produits locaux
CO2_MOINS_25 = 500
CO2_25_50 = 375
CO2_50_75 = 250
CO2_PLUS_75= 125
#Achats electronique
CO2_ACHATS_ELEC_AN = 300
CO2_ACHATS_ELEC_2_3 = 150
CO2_ACHATS_ELEC_4_5 = 75
CO2_ACHATS_ELEC_MOINS_FREQ = 50
#Destinations Vacances
CO2_VAC_LOCAL = 20
CO2_VAC_NAT = 100
CO2_VAC_INT_EU = 500
CO2_VAC_INT_HR_EU = 1000
#Avions
CO2_PAR_VOY = 0.259 
#Deconnexion
CO2_DEC_OUI = -50
CO2_DEC_NON = 0
#Initiatives Eco
CO2_ECO_OUI_REG = -100
CO2_ECO_OUI_OCC = -50
CO2_ECO_NON = 0
#Tri des dechets
CO2_TRI_OUI = -150
CO2_TRI_NON = 0
#Teletravail
CO2_TELE_1 = 2240
CO2_TELE_2 = 1792
CO2_TELE_3 = 1344
CO2_TELE_4 = 896
CO2_TELE_5 = 448
#Jardin Potager
CO2_JARD_OUI = -100
CO2_JARD_NON = 0
#Source Energie Renouvelables
CO2_SRC_ENER_OUI = -473
CO2_SRC_ENER_NON = 0
#Utilisation streaming
CO2_STR_TT_JR = 500
CO2_STR_PLS_SEM = 300
CO2_STR_1_SEM = 150
CO2_STR_MO_1_SEM = 50
#Achats Responsable
CO2_ACH_RES_TR_SOUV = -100
CO2_ACH_RES_SOUV = -60
CO2_ACH_RES_PAR = -20
CO2_ACH_RES_RAR = 0
#Repas a emporter
CO2_REP_TT_JR= 300
CO2_REP_PL_SEM = 200
CO2_REP_1_SEM = 100
CO2_REP_M_1_SEM = 50
