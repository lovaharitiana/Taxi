from rest_framework import serializers
#from django.contrib.auth.models import User
from .models import Chauffeur, Taxi, Visite, Assurance, Agence, User, Course
#from rest_framework.authtoken.models import Token
#class UserSerializer(serializers.ModelSerializer):
    #class Meta:
        #model = User
        #fields = ('id','username', 'password')
        #extra_kwargs = {'password': {'write_only': True, 'required': True}}
    
    #def create(self, validated_data):
       # user = User.objects.create_user(**validated_data)
        #Token.objects.create(user=user)
        #return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
           model = User
           fields = ('id','name', 'email', 'password')
           extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id','depart', 'destination', 'distance', 'montant', 'user','taxi','dateCrs','description')
       

class ChauffeurSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Chauffeur
        fields = ('numChf','nomChf','prenomChf','adresse', 'permis', 'capacite')


class TaxiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taxi
        fields = ('numImm','marque','nb_place','carte_grise', 'chauffeur')


# class Carte_griseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Carte_grise
#         fields = ('numSerie','date_fabrication')

class VisiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visite
        fields = ('numVis','date_vis','fin_vis','taxi')

class AssuranceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assurance
        fields = ('ref','debut_ass','fin_ass', 'taxi', 'agence')

class AgenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agence
        fields = ('numAg','nomAg')

# class CapaciteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Capacite
#         fields = ('numCap','droit','date_certificat', 'permi')

# class PermiSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Permi
#         fields = ('numPer','date')

# class CategorieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Categorie
#         fields = ('numCat','type')

