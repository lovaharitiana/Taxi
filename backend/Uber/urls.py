from django.contrib import admin
from django.urls import path
from .views import ChauffeurView, TaxiView, Carte_griseView, VisiteView, AssuranceView, AgenceView, CapaciteView, PermiView, CategorieView, RegisterView, LoginView, UserViewSet, UserView, LogoutView, CourseView, CourseViewSet

from rest_framework import routers
from django.conf.urls import include
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('users/<int:pk>/', UserViewSet)
router.register('course', CourseViewSet)
router.register('course/<int:pk>/', CourseViewSet)

#router.register('courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('courses/', CourseView.as_view()),
    path('register/', RegisterView.as_view()), 
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()), 
    path('user/', UserView.as_view()), 
    path('chauffeurs/', ChauffeurView.as_view()),
    path('chauffeurs/<int:pk>/', ChauffeurView.as_view()),
    path('taxis/', TaxiView.as_view()),
    path('taxis/<str:pk>/', TaxiView.as_view()),
    path('carte_grises/', Carte_griseView.as_view()),
    path('carte_grises/<int:pk>/', Carte_griseView.as_view()),
    path('visites/', VisiteView.as_view()),
    path('visites/<int:pk>/', VisiteView.as_view()),
    path('assurances/', AssuranceView.as_view()),
    path('assurances/<int:pk>/', AssuranceView.as_view()),
    path('agences/', AgenceView.as_view()),
    path('agences/<str:pk>/', AgenceView.as_view()),
    path('capacites/', CapaciteView.as_view()),
    path('capacites/<int:pk>/', CapaciteView.as_view()),
    path('permis/', PermiView.as_view()),
    path('permis/<str:pk>/', PermiView.as_view()),
    path('categories/', CategorieView.as_view()),
    path('categories/<str:pk>/', CategorieView.as_view())

]
