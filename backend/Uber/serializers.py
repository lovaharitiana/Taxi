from rest_framework import serializers
from .models import Chauffeur, Taxi, Carte_grise, Visite, Assurance, Agence, Capacite, Permi, Categorie

class ChauffeurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chauffeur
        fields = ('numChf','nomChf','prenomChf','date_naissance','lieu_naissance','adresse','profession')


class TaxiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taxi
        fields = ('numImm','marque','nb_place','numMoteur','poids_total','poids_vide','charge_utile','carrosserie')


class Carte_griseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carte_grise
        fields = ('numSerie','date_fabrication')

class VisiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visite
        fields = ('numVis','date_vis','fin_vis')

class AssuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assurance
        fields = ('ref','debut_ass','fin_ass')

class AgenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agence
        fields = ('numAg','nomAg')

class CapaciteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacite
        fields = ('numCap','droit','date_certificat')

class PermiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permi
        fields = ('numPer','date')

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ('numCat','type')

