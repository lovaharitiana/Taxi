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


class Chauffeur(models.Model):
    numChf = models.AutoField(primary_key=True)
    nomChf = models.CharField(max_length=30)
    prenomChf = models.CharField(max_length=20)
    adresse = models.CharField(max_length=20)
    permis = models.CharField(max_length=5, default="permis")
    capacite = models.IntegerField(default=1)
   

class Taxi(models.Model):
    numImm = models.CharField(max_length=10, primary_key=True)
    marque = models.CharField(max_length=20)
    nb_place = models.IntegerField(default=1)
    carte_grise = models.IntegerField(default=1)
    chauffeur = models.ForeignKey(Chauffeur, on_delete=models.CASCADE, blank=True, null=True, to_field="numChf", db_column="numChf")


class Course(models.Model):
    depart = models.CharField(max_length=30)
    destination = models.CharField(max_length=30)
    distance = models.FloatField(default=0.0)
    montant = models.IntegerField(default=1)
    dateCrs = models.DateField(default=timezone.now)
    description = models.TextField(max_length=255, default="Description de la course")
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
    




