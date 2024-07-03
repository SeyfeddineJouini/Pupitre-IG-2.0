from constants import *

# Fonctions de calcul du CO2 pour différents modes de transport
def calculer_taux_transport_commun(d, J):
    return d * CO2_TRANSPORT_COMMUN * J * WEEKS_PER_YEAR

def calculer_taux_voiture(d, J, c):
    return d * CO2_VOITURE / c * J * WEEKS_PER_YEAR

def calculer_taux_voiture_grand_deplacement(d, c):
    return d * CO2_VOITURE / c

def calculer_taux_avion(d):
    return d * CO2_AVION

def calculer_taux_tgv(d):
    return d * CO2_TGV


# Fonctions de calcul du CO2 pour l'alimentation
def calculer_taux_alimentation_viande(frequence):
    if frequence == '1 à 2 fois par semaine':
        return CO2_VIANDE_1_2
    elif frequence == '3 à 4 fois par semaine':
        return CO2_VIANDE_3_4
    elif frequence == 'Plus de 4 fois par semaine':
        return CO2_VIANDE_PLUS_4
    return 0

def calculer_taux_eau(boisson):
    if boisson == 'Eau en bouteille':
        return CO2_EAU_BOUTEILLE
    return CO2_EAU_ROBINET

def calculer_taux_boissons(boissons):
    total = 0
    if 'Café' in boissons:
        total += CO2_CAFE
    if 'Thé' in boissons:
        total += CO2_THE
    if 'Chocolat' in boissons:
        total += CO2_CHOCOLAT
    if 'Aucune' in boissons:
        total += 0
    return total


# Fonctions de calcul du CO2 pour les services divers
def calculer_taux_vetements(frequence):
    if frequence == 'Moins de 2':
        return CO2_VETEMENTS_MOINS_2
    elif frequence == 'Entre 2 et 5':
        return CO2_VETEMENTS_2_5
    elif frequence == 'Plus de 5':
        return CO2_VETEMENTS_PLUS_5
    return 0

def calculer_taux_internet(frequence):
    if frequence == 'Moins de 3 heures':
        return CO2_INTERNET_3H
    elif frequence == 'Entre 6 et 10 heures':
        return CO2_INTERNET_6_10H
    elif frequence == 'Plus de 10 heures':
        return CO2_INTERNET_PLUS_10H
    return 0


# Fonction de calcul des émissions de CO2 pour le logement
def calcul_emissions(data):
    logement_total = 0

    # Déterminer le multiplicateur basé sur l'état du logement
    if data.get('logement_recent') == 'oui':
        multiplicateur = CO2_LOGREC
    elif data.get('logement_recent') == 'non':
        multiplicateur = CO2_LOGANC

    # Calcul selon le type de logement et son état
    if data.get('logement') == 'Dans une maison en colocation':
        if data.get('logement_chauffage') == 'Gaz':
            logement_total = multiplicateur * CO2_GAZ_MAIS
        elif data.get('logement_chauffage') == 'Fioul':
            logement_total = multiplicateur * CO2_FIOUL_MAIS
        elif data.get('logement_chauffage') == 'Electricité':
            logement_total = multiplicateur * CO2_ELEC_MAIS
        elif data.get('logement_chauffage') == 'Je ne sais pas':
            logement_total = multiplicateur * (
                PERC_ELEC * CO2_ELEC_MAIS + 
                PERC_GAZ * CO2_GAZ_MAIS + 
                PERC_FIOUL * CO2_FIOUL_MAIS
            )
    elif data.get('logement') == 'Seul(e) dans un appartement':
        if data.get('logement_chauffage') == 'Gaz':
            logement_total = multiplicateur * CO2_GAZ_APPS
        elif data.get('logement_chauffage') == 'Fioul':
            logement_total = multiplicateur * CO2_FIOUL_APPS
        elif data.get('logement_chauffage') == 'Electricité':
            logement_total = multiplicateur * CO2_ELEC_APPS
        elif data.get('logement_chauffage') == 'Je ne sais pas':
            logement_total = multiplicateur * (
                PERC_ELEC * CO2_ELEC_APPS + 
                PERC_GAZ * CO2_GAZ_APPS + 
                PERC_FIOUL * CO2_FIOUL_APPS
            )
    elif data.get('logement') == 'Dans un appartement en colocation':
        if data.get('logement_chauffage') == 'Gaz':
            logement_total = multiplicateur * CO2_GAZ_APPC
        elif data.get('logement_chauffage') == 'Fioul':
            logement_total = multiplicateur * CO2_FIOUL_APPC
        elif data.get('logement_chauffage') == 'Electricité':
            logement_total = multiplicateur * CO2_ELEC_APPC
        elif data.get('logement_chauffage') == 'Je ne sais pas':
            logement_total = multiplicateur * (
                PERC_ELEC * CO2_ELEC_APPC + 
                PERC_GAZ * CO2_GAZ_APPC + 
                PERC_FIOUL * CO2_FIOUL_APPC
            )

    return logement_total