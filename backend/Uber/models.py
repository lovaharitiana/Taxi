from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from typing import List

from django.core.exceptions import PermissionDenied


# Create your models here
class User(AbstractBaseUser):
    name= models.CharField(max_length=20)
    email = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=10)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['']

class Course(models.Model):
    numCrs = models.CharField(max_length=10, primary_key=True)
    depart = models.CharField(max_length=30)
    destination = models.CharField(max_length=30)
   
    
 
    

class Chauffeur(models.Model):
    numChf = models.AutoField(primary_key=True)
    nomChf = models.CharField(max_length=30)
    prenomChf = models.CharField(max_length=20)
    date_naissance = models.DateField()
    lieu_naissance = models.CharField(max_length=20)
    adresse = models.CharField(max_length=20)
    profession = models.CharField(max_length=20)

class Taxi(models.Model):
    numImm = models.CharField(max_length=10, primary_key=True)
    marque = models.CharField(max_length=20)
    nb_place = models.IntegerField()
    numMoteur = models.CharField(max_length=20)
    poids_total = models.IntegerField()
    poids_vide = models.IntegerField()
    charge_utile = models.IntegerField()
    carrosserie = models.CharField(max_length=10)

class Carte_grise(models.Model): 
    numSerie = models.IntegerField(primary_key=True)
    date_fabrication = models.DateField()

class Visite(models.Model): 
    numVis = models.IntegerField(primary_key=True)
    date_vis = models.DateField()
    fin_vis = models.DateField()

class Assurance(models.Model): 
    ref = models.IntegerField(primary_key=True)
    debut_ass = models.DateField()
    fin_ass = models.DateField()

class Agence(models.Model): 
    numAg = models.CharField(max_length=10, primary_key=True)
    nomAg = models.CharField(max_length=10)

class Capacite(models.Model): 
    numCap = models.IntegerField(primary_key=True)
    droit = models.IntegerField()
    date_certificat = models.DateField()

class Permi(models.Model): 
    numPer = models.CharField(max_length=10, primary_key=True)
    date = models.DateField()

class Categorie(models.Model): 
    numCat = models.CharField(max_length=10, primary_key=True)
    type = models.CharField(max_length=5)

