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
    return total


# Fonctions de calcul du CO2 pour les services divers
def calculer_taux_vetements(frequence):
    if frequence == 'Entre 1 à 3 vêtements':
        return CO2_VETEMENTS_1_3
    elif frequence == 'Entre 4 à 8 vêtements':
        return CO2_VETEMENTS_4_8
    elif frequence == 'Plus de 8 vêtements':
        return CO2_VETEMENTS_PLUS_8
    return 0

def calculer_taux_internet(frequence):
    if frequence == 'Moins de 3 heures':
        return CO2_INTERNET_3H
    elif frequence == 'Entre 6 et 10 heures':
        return CO2_INTERNET_6_10H
    elif frequence == 'Plus de 10 heures':
        return CO2_INTERNET_PLUS_10H
    return 0