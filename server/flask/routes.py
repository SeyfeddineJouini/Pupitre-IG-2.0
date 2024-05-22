from flask import Flask, request, jsonify
from calculations import *
from constants import *

app = Flask(__name__)

@app.route('/api/calcul_emission', methods=['POST'])
def calcul_emission_route():
    transport_total = 0
    alimentation_total = 0
    divers_total = 0
    logement_total = 0

    # Récupération des données envoyées par le client
    data = request.get_json()
    print(data)
    print(type(data))

    # Traitement des données pour les différents types de transport
    for t in data.items():
        if t[0] == 'transport':
            if t[1] == 'velo/pied':
                transport_total += 0  # Pas d'émission pour vélo ou marche
            elif t[1] == 'voiture':
                covoiturage = 1 if data.get('voiture_coivoiturage', 'non') == 'non' else int(data.get('voiture_covoiturage_personne', 1))
                transport_total += calculer_taux_voiture(int(data.get('voiture_km', 0)), 5, covoiturage)
            elif t[1] == 'transports_commun':
                transport_total += calculer_taux_transport_commun(int(data.get('transport_commun_aller_retour', 0)), 5)
        elif t[0] == 'transport_weekend':
            if t[1] == 'velo/pied':
                transport_total += 0  # Pas d'émission pour vélo ou marche
            elif t[1] == 'voiture':
                covoiturage = 1 if data.get('voiture_weekend_coivoiturage', 'non') == 'non' else int(data.get('voiture_weekend_covoiturage_personne', 1))
                transport_total += calculer_taux_voiture(int(data.get('voiture_weekend_km', 0)), 2, covoiturage)
            elif t[1] == 'transports_weekend_commun':
                transport_total += calculer_taux_transport_commun(int(data.get('transport_weekend_commun_aller_retour', 0)), 2)

    # Grands déplacements
    if data.get('grand_deplacement_avion') == 'oui':
        transport_total += calculer_taux_avion(int(data.get('grand_deplacement_avion_km', 0)))

    if data.get('grand_deplacement_train') == 'oui':
        transport_total += calculer_taux_tgv(int(data.get('grand_deplacement_train_km', 0)))

    if data.get('grand_deplacement_voiture') == 'oui':
        covoiturage = 1 if data.get('voiture_grand_deplacement_coivoiturage', 'non') == 'non' else int(data.get('voiture_grand_deplacement_covoiturage_personne', 1))
        transport_total += calculer_taux_voiture_grand_deplacement(int(data.get('voiture_grand_deplacement_km', 0)), covoiturage)


    # Calcul des émissions pour l'alimentation
    if data.get('régime_alimentaire') == 'oui':
        alimentation_total += CO2_VEGAN
    else:
        frequence_viande = data.get('consommation_viande_rouge', '1 à 2 fois par semaine')
        alimentation_total += CO2_VEGAN + calculer_taux_alimentation_viande(frequence_viande)

    alimentation_total += calculer_taux_eau(data.get('Alimentation_eau', 'Eau du robinet'))
    alimentation_total += calculer_taux_boissons(data.get('Alimentation_Boissons', []))
    
    
    # Calcul des émissions pour les services divers
    divers_total += CO2_FIXE_SERVICES  # Ajout de la valeur fixe pour les services
    divers_total += calculer_taux_vetements(data.get('divers_vetements', 'Entre 1 à 3 vêtements'))
    divers_total += calculer_taux_internet(data.get('divers_internet', 'Moins de 3 heures'))

    #Calcul emissions Logement 
    #Calcul selon le type et la superficie
    if data.get('logement') == 'Seul(e) dans un appartement':
        if data.get('logement_récent') == 'oui':
            logement_total += CO2_LOGREC * A_APPS
        else :
            logement_total += CO2_LOGANC * A_APPS
    elif data.get('logement') == 'Dans une maison en colocation ':
        if data.get('logement_récent') == 'oui':
            logement_total += CO2_LOGREC * A_MAIS
        else :
            logement_total += CO2_LOGANC * A_MAIS
    elif data.get('logement') == 'Dans un appartement en colocation ':
        if data.get('logement_récent') == 'oui':
            logement_total += CO2_LOGREC * A_APPC
        else :
            logement_total += CO2_LOGANC * A_APPC  
    # Calcul selon le type de chauffage
    if data.get('logement_chauffage') == 'Gaz':
            logement_total += CO2_GAZ
    elif data.get('logement_chauffage') == 'Fioul':
            logement_total += CO2_FIOUL
    elif data.get('logement_chauffage') == 'Electricité':
            logement_total += CO2_ELEC
    # Calcul selon l'electroménager
    if 'logement_equipements' in data:
        for equipement in data['logement_equipements']:
            if equipement in CO2_EMISSIONS:
                logement_total += CO2_EMISSIONS[equipement]
    # Construction du résultat final
    result = {
        "Transport": transport_total / 1000,  # Convertir en tonnes de CO2
        "Alimentation": alimentation_total / 1000,  # Convertir en tonnes de CO2
        "Logement": logement_total / 1000,  # À compléter
        "Divers": divers_total / 1000  # Convertir en tonnes de CO2
    }

    return jsonify(result)