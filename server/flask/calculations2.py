from constants2 import *

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
###################################~#####################################Ajout ENER AP
def calculer_taux_alimentation_prot(proteine):
    if proteine == 'viande_rouge':
        return CO2_VIANDE_ROUGE
    elif proteine == 'volaille':
        return CO2_VOLAILLE
    elif proteine == 'poisson_gras':
        return CO2_POISS_GRAS
    elif proteine == 'poisson_blanc':
        return CO2_POISS_BL
    elif proteine == 'vegetarien':
        return CO2_VEGE

def calculer_taux_produits_loc(produits):    
    if produits == 'moins_25':
        return CO2_MOINS_25
    elif produits == '25_50':
        return CO2_25_50
    elif produits == '50_75':
        return CO2_50_75
    elif produits == 'plus_75':
        return CO2_PLUS_75

def calculer_taux_repas_emp(freq):
    if freq == 'tous_les_jours':
        return CO2_REP_TT_JR
    elif freq == 'plusieurs_fois_par_semaine':
        return CO2_REP_PL_SEM
    elif freq == 'une_fois_par_semaine':
        return CO2_REP_1_SEM
    elif freq == 'moins_d_une_fois_par_semaine':
        return CO2_REP_M_1_SEM
    
def calculer_taux_jard_pot(freq):
    if freq == 'oui':
        return CO2_JARD_OUI
    elif freq == 'non':
        return CO2_JARD_NON

def calculer_taux_achats_resp(freq):
    if freq == 'tres_souvent':
        return CO2_ACH_RES_TR_SOUV
    elif freq == 'souvent':
        return CO2_ACH_RES_SOUV
    elif freq == 'parfois':
        return CO2_ACH_RES_PAR
    elif freq == 'rarement':
        return CO2_ACH_RES_RAR

def calculer_taux_init_eco(freq):
    if freq == 'oui_regulier':
        return CO2_ECO_OUI_REG
    elif freq == 'oui_occasionnel':
        return CO2_ECO_OUI_OCC
    elif freq == 'non':
        return CO2_ECO_NON

def calculer_taux_ach_elec(freq):
    if freq == 'annuel':
        return CO2_ACHATS_ELEC_AN
    elif freq == 'deux_trois_ans':
        return CO2_ACHATS_ELEC_2_3
    elif freq == 'quatre_cinq_ans':
        return CO2_ACHATS_ELEC_4_5
    elif freq == 'moins_freq':
        return CO2_ACHATS_ELEC_MOINS_FREQ

def calculer_taux_dest_vacances(freq):
    if freq == 'local':
        return CO2_VAC_LOCAL
    elif freq == 'national':
        return CO2_VAC_NAT
    elif freq == 'international_europe':
        return CO2_VAC_INT_EU
    elif freq == 'international_hors_europe':
        return CO2_VAC_INT_HR_EU

def calculer_taux_uti_stream(freq):
    if freq == 'tous_les_jours':
        return CO2_STR_TT_JR
    elif freq == 'plusieurs_fois_par_semaine':
        return CO2_STR_PLS_SEM
    elif freq == 'une_fois_par_semaine':
        return CO2_STR_1_SEM
    elif freq == 'moins_d_une_fois_par_semaine':
        return CO2_STR_MO_1_SEM
        
def calculer_taux_dec(freq):
    if freq == 'oui':
        return CO2_DEC_OUI
    elif freq == 'non':
        return CO2_DEC_NON
################################################################### FIN Ajout ENER AP
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
   #########################################################Ajouts ENER APP
    if data.get('sources_energie_renouvelable') == 'oui':
        logement_total += CO2_SRC_ENER_OUI
    elif data.get('sources_energie_renouvelable') == 'non':
        logement_total += CO2_SRC_ENER_NON

    if data.get('teletravail') == 1:
        logement_total += CO2_TELE_1
    elif data.get('teletravail') == 2:
        logement_total += CO2_TELE_2
    elif data.get('teletravail') == 3:
        logement_total += CO2_TELE_3
    elif data.get('teletravail') == 4:
        logement_total += CO2_TELE_4
    elif data.get('teletravail') == 5:
        logement_total += CO2_TELE_5
    
    if data.get('tri_dechets') == 'oui':
        logement_total += CO2_TRI_OUI
    elif data.get('tri_dechets') == 'non':
        logement_total += CO2_TRI_NON
   ###################################################### FIN Ajouts ENER APP
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
