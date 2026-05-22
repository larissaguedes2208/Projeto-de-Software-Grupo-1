from django.shortcuts import render

def remover_usuario(request):
    return render(request, 'usuarios/remover_usuario.html')

def editar_usuario(request):
    return render(request, 'usuarios/editar_usuario.html')

def listar_partidas(request):
    return render(request, 'usuarios/listar_partidas.html')

def editar_partida(request):
    return render(request, 'usuarios/editar_partida.html')

def confirmar_participacao(request):
    return render(request, 'usuarios/confirmar_participacao.html')

def buscar_partidas(request):
    return render(request, 'usuarios/buscar_partidas.html')