from rest_framework.views import APIView
from .serializers import (
    ChauffeurSerializer,
    TaxiSerializer,
    
    VisiteSerializer,
    AssuranceSerializer,
    AgenceSerializer,
    
    UserSerializer,
    CourseSerializer,
)
from django.http.response import JsonResponse
from .models import (
    Chauffeur,
    Taxi,
   
    Visite,
    Assurance,
    Agence,
   
    Course,
    User
)
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
import jwt, datetime
from rest_framework import viewsets

# from django.contrib.auth import get_user_model
# User = get_user_model()

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


import jwt, datetime

# Create your views here.
##########################USER#####################################################################
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, pk=None):
        user_to_delete = User.objects.get(id=pk)
        user_to_delete.delete()
        return JsonResponse("Utilisateur supprimé avec succes", safe=False)

   

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Utilisateur ajouté avec succes", safe=False)
        return JsonResponse("Erreur d'ajout de l'utilisateur", safe=False)


        

class LoginView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("User not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1000),
            'iat': datetime.datetime.utcnow()

        
       }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response


#############################COURSE###############################################################
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
 
    def put(self, request, pk=None):
        course_to_update = Course.objects.get(id=pk)
        serializer = CourseSerializer(
            instance=course_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Course", safe=False)
        return JsonResponse("Erreur de modification de la course")

class CourseView(APIView):
    def post(self, request):
        user=request.user
        print(user)
        data = request.data
        serializer = CourseSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("votre demande est bien envoyée", safe=False)
        return JsonResponse("Erreur d'envoi de votre demande", safe=False)

   


###########################CHAUFFEUR#####################################################################
class ChauffeurView(APIView):
    def get_chauffeur(self, pk):
        try:
            chauffeur = Chauffeur.objects.get(numChf=pk)
            return chauffeur
        except:
            return JsonResponse("Chauffeur n'existe pas", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_chauffeur(pk)
            serializer = ChauffeurSerializer(data)
        else:
            data = Chauffeur.objects.all()
            serializer = ChauffeurSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = ChauffeurSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Chauffeur ajouté avec succes", safe=False)
        return JsonResponse("Erreur d'ajout de chauffeur", safe=False)

    def put(self, request, pk=None):
        chauffeur_to_update = Chauffeur.objects.get(numChf=pk)
        serializer = ChauffeurSerializer(
            instance=chauffeur_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Chauffeur modifié avec succes", safe=False)
        return JsonResponse("Erreur de modification de chauffeur")

    def delete(self, request, pk=None):
        chauffeur_to_delete = Chauffeur.objects.get(numChf=pk)
        chauffeur_to_delete.delete()
        return JsonResponse("Chauffeur supprimé avec succes", safe=False)


##################################################TAXI####################################################################################
class TaxiViewSet(viewsets.ModelViewSet):
    queryset = Taxi.objects.all()
    serializer_class = TaxiSerializer

class TaxiView(APIView):
    def get_taxi(self, pk):
        try:
            taxi = Taxi.objects.get(numImm=pk)
            return taxi
        except:
            return JsonResponse("Taxi n'existe pas", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_taxi(pk)
            serializer = TaxiSerializer(data)
        else:
            data = Taxi.objects.all()
            serializer = TaxiSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TaxiSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Taxi ajouté avec succes", safe=False)
        return JsonResponse("Erreur d'ajout de taxi", safe=False)

    def put(self, request, pk=None):
        taxi_to_update = Taxi.objects.get(numImm=pk)
        serializer = TaxiSerializer(
            instance=taxi_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Taxi modifié avec succes", safe=False)
        return JsonResponse("Erreur de modification de taxi")

    def delete(self, request, pk=None):
        taxi_to_delete = Taxi.objects.get(numImm=pk)
        taxi_to_delete.delete()
        return JsonResponse("Taxi supprimé avec succes", safe=False)


####################################################CARTE_GRISE###########################################################################
# class Carte_griseView(APIView):
#     def get_Carte_grise(self, pk):
#         try:
#             carte_grise = Carte_grise.objects.get(numSerie=pk)
#             return carte_grise
#         except:
#             return JsonResponse("carte_grise Does Not Exist", safe=False)

#     def get(self, request, pk=None):
#         if pk:
#             data = self.get_Carte_grise(pk)
#             serializer = Carte_griseSerializer(data)
#         else:
#             data = Carte_grise.objects.all()
#             serializer = Carte_griseSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         serializer = Carte_griseSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Carte_grise created successfully", safe=False)
#         return JsonResponse("Failed to add Carte_grise", safe=False)

#     def put(self, request, pk=None):
#         carte_grise_to_update = Carte_grise.objects.get(numSerie=pk)
#         serializer = Carte_griseSerializer(
#             instance=carte_grise_to_update, data=request.data, partial=True
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Carte_grise Updated Successfully", safe=False)
#         return JsonResponse("Failed to Update Carte_grise")

#     def delete(self, request, pk=None):
#         carte_grise_to_delete = Carte_grise.objects.get(numSerie=pk)
#         carte_grise_to_delete.delete()
#         return JsonResponse("Carte_grise deleted successfully", safe=False)


#############################################VISITE###############################################################
class VisiteView(APIView):
    def get_Visite(self, pk):
        try:
            visite = Visite.objects.get(numVis=pk)
            return visite
        except:
            return JsonResponse("visite n'existe pas", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_Visite(pk)
            serializer = VisiteSerializer(data)
        else:
            data = Visite.objects.all()
            serializer = VisiteSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = VisiteSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visite ajouté avec succes", safe=False)
        return JsonResponse("Erreur d'ajout de visite", safe=False)

    def put(self, request, pk=None):
        visite_to_update = Visite.objects.get(numVis=pk)
        serializer = VisiteSerializer(
            instance=visite_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Visite modifié avec succes", safe=False)
        return JsonResponse("Erreur de modification de visite")

    def delete(self, request, pk=None):
        visite_to_delete = Visite.objects.get(numVis=pk)
        visite_to_delete.delete()
        return JsonResponse("Visite supprimé avec succes", safe=False)


##################################################ASSURANCE#######################################################""
class AssuranceView(APIView):
    def get_Assurance(self, pk):
        try:
            assurance = Assurance.objects.get(ref=pk)
            return assurance
        except:
            return JsonResponse("Assurance n'existe pas", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_Assurance(pk)
            serializer = AssuranceSerializer(data)
        else:
            data = Assurance.objects.all()
            serializer = AssuranceSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = AssuranceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Assurance ajoutée avec succes", safe=False)
        return JsonResponse("Erreur d'ajout d'assurance", safe=False)

    def put(self, request, pk=None):
        assurance_to_update = Assurance.objects.get(ref=pk)
        serializer = AssuranceSerializer(
            instance=assurance_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Assurance modifiée avec succes", safe=False)
        return JsonResponse("Erreur de modification d'assurance")

    def delete(self, request, pk=None):
        assurance_to_delete = Assurance.objects.get(ref=pk)
        assurance_to_delete.delete()
        return JsonResponse("Assurance supprimée avec succes", safe=False)


##########################################AGENCE#####################################################################
class AgenceView(APIView):
    def get_Agence(self, pk):
        try:
            agence = Agence.objects.get(ref=pk)
            return agence
        except:
            return JsonResponse("Agence n'existe pas", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_Agence(pk)
            serializer = AgenceSerializer(data)
        else:
            data = Agence.objects.all()
            serializer = AgenceSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = AgenceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Agence ajoutée avec succes", safe=False)
        return JsonResponse("Erreur d'ajout d'agence", safe=False)

    def put(self, request, pk=None):
        agence_to_update = Agence.objects.get(numAg=pk)
        serializer = AgenceSerializer(
            instance=agence_to_update, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Agence modifiée avec succes", safe=False)
        return JsonResponse("Erreur de modification de l'agence")

    def delete(self, request, pk=None):
        agence_to_delete = Agence.objects.get(numAg=pk)
        agence_to_delete.delete()
        return JsonResponse("Agence supprimée avec succes", safe=False)


########################################CAPACITE####################################################################
# class CapaciteView(APIView):
#     def get_Capacite(self, pk):
#         try:
#             capacite = Capacite.objects.get(numCap=pk)
#             return capacite
#         except:
#             return JsonResponse("Capacite Does Not Exist", safe=False)

#     def get(self, request, pk=None):
#         if pk:
#             data = self.get_Capacite(pk)
#             serializer = CapaciteSerializer(data)
#         else:
#             data = Capacite.objects.all()
#             serializer = CapaciteSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         serializer = CapaciteSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Capacite created successfully", safe=False)
#         return JsonResponse("Failed to add Capacite", safe=False)

#     def put(self, request, pk=None):
#         capacite_to_update = Capacite.objects.get(numCap=pk)
#         serializer = CapaciteSerializer(
#             instance=capacite_to_update, data=request.data, partial=True
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Capacite Updated Successfully", safe=False)
#         return JsonResponse("Failed to Update Capacite")

#     def delete(self, request, pk=None):
#         capacite_to_delete = Capacite.objects.get(numCap=pk)
#         capacite_to_delete.delete()
#         return JsonResponse("Capacite deleted successfully", safe=False)


############################################PERMIS######################################################################
# class PermiView(APIView):
#     def get_Permi(self, pk):
#         try:
#             permi = Permi.objects.get(numPer=pk)
#             return permi
#         except:
#             return JsonResponse("Permi Does Not Exist", safe=False)

#     def get(self, request, pk=None):
#         if pk:
#             data = self.get_Permi(pk)
#             serializer = PermiSerializer(data)
#         else:
#             data = Permi.objects.all()
#             serializer = PermiSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         serializer = PermiSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Permi created successfully", safe=False)
#         return JsonResponse("Failed to add Permi", safe=False)

#     def put(self, request, pk=None):
#         permi_to_update = Permi.objects.get(numPer=pk)
#         serializer = PermiSerializer(
#             instance=permi_to_update, data=request.data, partial=True
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Permi Updated Successfully", safe=False)
#         return JsonResponse("Failed to Update Permi")

#     def delete(self, request, pk=None):
#         permi_to_delete = Permi.objects.get(numPer=pk)
#         permi_to_delete.delete()
#         return JsonResponse("Permi deleted successfully", safe=False)


################################################"CATEGORIE##############################################################
# class CategorieView(APIView):
#     def get_Categorie(self, pk):
#         try:
#             categorie = Categorie.objects.get(numCat=pk)
#             return categorie
#         except:
#             return JsonResponse("Categorie Does Not Exist", safe=False)

#     def get(self, request, pk=None):
#         if pk:
#             data = self.get_Categorie(pk)
#             serializer = CategorieSerializer(data)
#         else:
#             data = Categorie.objects.all()
#             serializer = CategorieSerializer(data, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         data = request.data
#         serializer = CategorieSerializer(data=data)

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Categorie created successfully", safe=False)
#         return JsonResponse("Failed to add Categorie", safe=False)

#     def put(self, request, pk=None):
#         categorie_to_update = Categorie.objects.get(numCat=pk)
#         serializer = CategorieSerializer(
#             instance=categorie_to_update, data=request.data, partial=True
#         )

#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse("Categorie Updated Successfully", safe=False)
#         return JsonResponse("Failed to Update Categorie")

#     def delete(self, request, pk=None):
#         categorie_to_delete = Categorie.objects.get(numCat=pk)
#         categorie_to_delete.delete()
#         return JsonResponse("Categorie deleted successfully", safe=False)
