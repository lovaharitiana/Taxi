from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from typing import List
from django.utils import timezone
from django.core.exceptions import PermissionDenied


# Create your models here
class User(AbstractBaseUser):
    name= models.CharField(max_length=20)
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=10)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['']

class Categorie(models.Model): 
    numCat = models.CharField(max_length=10, primary_key=True)
    type = models.CharField(max_length=5)
   


class Permi(models.Model): 
    numPer = models.CharField(max_length=10, primary_key=True)
    date = models.DateField()
    Categorie = models.ManyToManyField(Categorie)




   

class Capacite(models.Model): 
    numCap = models.IntegerField(primary_key=True)
    droit = models.IntegerField()
    date_certificat = models.DateField()
    permi = models.OneToOneField(Permi, on_delete=models.CASCADE, blank=True, null=True, to_field="numPer", db_column="numPer")
   

   
   



class Chauffeur(models.Model):
    numChf = models.AutoField(primary_key=True)
    nomChf = models.CharField(max_length=30)
    prenomChf = models.CharField(max_length=20)
    date_naissance = models.DateField()
    lieu_naissance = models.CharField(max_length=20)
    adresse = models.CharField(max_length=20)
    profession = models.CharField(max_length=20)
    permi = models.OneToOneField(Permi, on_delete=models.CASCADE, blank=True, null=True, to_field="numPer", db_column="numPer")
    capacite = models.OneToOneField(Capacite, on_delete=models.CASCADE, blank=True, null=True, to_field="numCap", db_column="numCap")
    


class Carte_grise(models.Model): 
    numSerie = models.IntegerField(primary_key=True)
    date_fabrication = models.DateField()


class Taxi(models.Model):
    numImm = models.CharField(max_length=10, primary_key=True)
    marque = models.CharField(max_length=20)
    nb_place = models.IntegerField()
    numMoteur = models.CharField(max_length=20)
    poids_total = models.IntegerField()
    poids_vide = models.IntegerField()
    charge_utile = models.IntegerField()
    carrosserie = models.CharField(max_length=10)
    carte_grise = models.OneToOneField(Carte_grise, on_delete=models.CASCADE, blank=True, null=True, to_field="numSerie", db_column="numSerie")
    chauffeur = models.OneToOneField(Chauffeur, on_delete=models.CASCADE, blank=True, null=True, to_field="numChf", db_column="numChf")




class Course(models.Model):
    depart = models.CharField(max_length=30)
    destination = models.CharField(max_length=30)
    distance = models.IntegerField(default=1)
    montant = models.IntegerField(default=1)
    date = models.DateField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    taxi = models.ForeignKey(Taxi, on_delete=models.CASCADE, blank=True, null=True, to_field="numImm", db_column="numImm")
    


class Visite(models.Model): 
    numVis = models.IntegerField(primary_key=True)
    date_vis = models.DateField()
    fin_vis = models.DateField()
    taxi = models.ForeignKey(Taxi, on_delete=models.CASCADE, blank=True, null=True, to_field="numImm", db_column="numImm")
   

class Agence(models.Model): 
    numAg = models.CharField(max_length=10, primary_key=True)
    nomAg = models.CharField(max_length=10)


class Assurance(models.Model): 
    ref = models.IntegerField(primary_key=True)
    debut_ass = models.DateField()
    fin_ass = models.DateField()
    taxi = models.ForeignKey(Taxi, on_delete=models.CASCADE, blank=True, null=True, to_field="numImm", db_column="numImm")
    agence = models.ForeignKey(Agence, on_delete=models.CASCADE, blank=True, null=True, to_field="numAg", db_column="numAg")
    




