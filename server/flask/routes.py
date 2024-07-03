from flask import Flask, request, jsonify
from calculations import *
from constants import *

app = Flask(__name__)

@app.route('/api/calcul_emission', methods=['POST'])
def calcul_emission_route():
    transport_total = 0
    alimentation_total = 0
    biens_total = 0
    logement_total = 0
    services_total = 0

    # Récupération des données envoyées par le client
    data = request.get_json()
    print(data)
    print(type(data))

    try:
        # Traitement des données pour les différents types de transport
        # Traitement des données pour les différents types de transport
        for t in data.items():
            if t[0] == 'transport':
                if t[1] == 'velo/pied':
                    transport_total += 0  # Pas d'émission pour vélo ou marche
                elif t[1] == 'voiture':
                    covoiturage = 1 if data.get('voiture_covoiturage', 'non') == 'non' else int(data.get('voiture_covoiturage_personne', 1))
                    transport_total += calculer_taux_voiture(int(data.get('voiture_km', 0)), 5, covoiturage)
                elif t[1] == 'transports_commun':
                    transport_total += calculer_taux_transport_commun(int(data.get('transport_commun_aller_retour', 0)), 5)
            elif t[0] == 'transport_weekend':
                if t[1] == 'velo/pied':
                    transport_total += 0  # Pas d'émission pour vélo ou marche
                elif t[1] == 'voiture':
                    covoiturage = 1 if data.get('voiture_weekend_covoiturage', 'non') == 'non' else int(data.get('voiture_weekend_covoiturage_personne', 1))
                    transport_total += calculer_taux_voiture(int(data.get('voiture_weekend_km', 0)), 2, covoiturage)
                elif t[1] == 'transports_weekend_commun':
                    transport_total += calculer_taux_transport_commun(int(data.get('transport_weekend_commun_aller_retour', 0)), 2)

        # Grands déplacements
        if data.get('grand_deplacement_avion') == 'oui':
            transport_total += calculer_taux_avion(int(data.get('grand_deplacement_avion_km', 0)))

        if data.get('grand_deplacement_train') == 'oui':
            transport_total += calculer_taux_tgv(int(data.get('grand_deplacement_train_km', 0)))

        if data.get('grand_deplacement_voiture') == 'oui':
            covoiturage = 1 if data.get('voiture_grand_deplacement_covoiturage', 'non') == 'non' else int(data.get('voiture_grand_deplacement_covoiturage_personne', 1))
            transport_total += calculer_taux_voiture_grand_deplacement(int(data.get('voiture_grand_deplacement_km', 0)), covoiturage)

        # Calcul des émissions pour l'alimentation
        if data.get('regime_alimentaire') == 'oui':
            alimentation_total += CO2_VEGAN
        else:
            frequence_viande = data.get('consommation_viande_rouge', '1 à 2 fois par semaine')
            alimentation_total += CO2_VEGAN + calculer_taux_alimentation_viande(frequence_viande)

        alimentation_total += calculer_taux_eau(data.get('Alimentation_eau', 'Eau du robinet'))
        alimentation_total += calculer_taux_boissons(data.get('Alimentation_Boissons', []))
        
        # Calcul des émissions pour les services divers
        services_total += CO2_FIXE_SERVICES  # Ajout de la valeur fixe pour les services
        biens_total += calculer_taux_vetements(data.get('divers_vetements', 'Moins de 2'))
        biens_total += calculer_taux_internet(data.get('divers_internet', 'Moins de 3 heures'))

        # Calcul des émissions pour le logement
        logement_total += calcul_emissions(data)
        
        # Calcul selon l'électroménager
        if 'logement_equipements' in data:
            for equipement in data['logement_equipements']:
                if equipement in CO2_EMISSIONS:
                    logement_total += CO2_EMISSIONS[equipement]

        # Construction du résultat final
        result = {
            "Transport": round(transport_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
            "Alimentation": round(alimentation_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
            "Logement": round(logement_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
            "Biens": round(biens_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
            "Services": round(services_total / 1000, 3)
        }

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400