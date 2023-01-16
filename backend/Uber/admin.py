from django.contrib import admin
from Uber.models import Chauffeur, Taxi, Visite

models_list = [Chauffeur]
admin.site.register(models_list)

# Register your models here.

models_list = [Taxi]
admin.site.register(models_list)


# models_list = [Carte_grise]
# admin.site.register(models_list)

models_list = [Visite]
admin.site.register(models_list)