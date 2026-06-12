from django.urls import path
from . import views

urlpatterns = [
    path('remover-usuario/', views.remover_usuario, name='remover_usuario'),
    path('editar-usuario/', views.editar_usuario, name='editar_usuario'),

    path('listar-partidas/', views.listar_partidas, name='listar_partidas'),
    path('criar-partida/', views.criar_partida, name='criar_partida'),
    path('editar-partida/<int:id_partida>/', views.editar_partida, name='editar_partida'),
    path('excluir-partida/<int:id_partida>/', views.excluir_partida, name='excluir_partida'),

    path('confirmar-participacao/', views.confirmar_participacao, name='confirmar_participacao'),
    path('buscar-partidas/', views.buscar_partidas, name='buscar_partidas'),
]