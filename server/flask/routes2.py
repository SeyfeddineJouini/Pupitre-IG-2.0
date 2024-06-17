from flask import  Flask,request, jsonify
from calculations2 import *
from constants2 import *

app = Flask(__name__)

@app.route('/api/calcul_emission_2', methods=['POST'])
def calcul_emission_route():
    transport_total = 0
    alimentation_total = 0
    logement_total = 0
    biens_total = 0
    services_total = 0

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

    print("Transport total: ", transport_total)

    # Calcul des émissions pour l'alimentation
    if data.get('régime_alimentaire') == 'oui':
        alimentation_total += CO2_VEGAN
    else:
        frequence_viande = data.get('consommation_viande_rouge', '1 à 2 fois par semaine')
        alimentation_total += CO2_VEGAN + calculer_taux_alimentation_viande(frequence_viande)

    alimentation_total += calculer_taux_eau(data.get('Alimentation_eau', 'Eau du robinet'))
    alimentation_total += calculer_taux_boissons(data.get('Alimentation_Boissons', []))  
    # Calcul des émissions pour les services divers
    services_total += CO2_FIXE_SERVICES  # Ajout de la valeur fixe pour les services
    biens_total += calculer_taux_vetements(data.get('divers_vetements', 'Entre 1 à 3 vêtements'))
    biens_total += calculer_taux_internet(data.get('divers_internet', 'Moins de 3 heures'))

    # Calcul des émissions pour le logement
    logement_total += calcul_emissions(data)
 
    # Calcul selon l'électroménager
    if 'logement_equipements' in data:
        for equipement in data['logement_equipements']:
            if equipement in CO2_EMISSIONS:
                logement_total += CO2_EMISSIONS[equipement]

    print("Logement total after appliances: ", logement_total)
###############################################Ajouts ENER APP#################################""
    alimentation_total += calculer_taux_repas_emp(data.get('repas_a_emporter','tous_les_jours'))
    alimentation_total += calculer_taux_jard_pot(data.get('jardin_potager','oui'))
    alimentation_total += calculer_taux_produits_loc(data.get('produits_locaux', 'moins_25'))
    alimentation_total += calculer_taux_alimentation_prot(data.get('alimentation_proteine', 'viande_rouge'))
    biens_total += calculer_taux_achats_resp(data.get('achats_responsables', 'tres_souvent'))
    biens_total += calculer_taux_init_eco(data.get('initiatives_ecologiques', 'oui_regulier'))
    biens_total += calculer_taux_ach_elec(data.get('achat_electronique', 'annuel'))
    transport_total += calculer_taux_dest_vacances(data.get('destination_vacances', 'local'))
    biens_total += calculer_taux_dec(data.get('pratiques_deconnexion', 'oui'))
    biens_total += calculer_taux_uti_stream(data.get('utilisation_streaming', 'tous_les_jours'))
###############################################FIN Ajouts ENER APP#################################""
    print("Alimentation total: ", alimentation_total)
    # Construction du résultat final
    result = {
        "Transport": round(transport_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
        "Alimentation": round(alimentation_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
        "Logement": round(logement_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
        "Biens": round(biens_total / 1000, 3),  # Convertir en tonnes de CO2 et arrondir
        "Services": round(services_total / 1000, 3)
    }
    return jsonify(result)