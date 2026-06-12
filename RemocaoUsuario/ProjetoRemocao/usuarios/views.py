from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from .models import Partida


def remover_usuario(request):
    return render(request, 'usuarios/remover_usuario.html')


def editar_usuario(request):
    return render(request, 'usuarios/editar_usuario.html')


def confirmar_participacao(request):
    return render(request, 'usuarios/confirmar_participacao.html')


def listar_partidas(request):
    partidas = Partida.objects.all().order_by('data', 'horario')

    return render(request, 'usuarios/listar_partidas.html', {
        'partidas': partidas
    })


def criar_partida(request):
    if request.method == 'POST':
        esporte = request.POST.get('esporte')
        local = request.POST.get('local')
        cidade = request.POST.get('cidade')
        data = request.POST.get('data')
        horario = request.POST.get('horario')
        num_jogadores = request.POST.get('num_jogadores')
        status = request.POST.get('status')

        Partida.objects.create(
            esporte=esporte,
            local=local,
            cidade=cidade,
            data=data,
            horario=horario,
            num_jogadores=num_jogadores,
            status=status
        )

        return redirect('listar_partidas')

    return render(request, 'usuarios/criar_partida.html')


def editar_partida(request, id_partida):
    partida = get_object_or_404(Partida, id=id_partida)

    if request.method == 'POST':
        partida.esporte = request.POST.get('esporte')
        partida.local = request.POST.get('local')
        partida.cidade = request.POST.get('cidade')
        partida.data = request.POST.get('data')
        partida.horario = request.POST.get('horario')
        partida.num_jogadores = request.POST.get('num_jogadores')
        partida.status = request.POST.get('status')

        partida.save()

        return redirect('listar_partidas')

    return render(request, 'usuarios/editar_partida.html', {
        'partida': partida
    })


def excluir_partida(request, id_partida):
    partida = get_object_or_404(Partida, id=id_partida)

    if request.method == 'POST':
        partida.delete()
        return redirect('listar_partidas')

    return render(request, 'usuarios/excluir_partida.html', {
        'partida': partida
    })


def buscar_partidas(request):
    termo = request.GET.get('q', '')

    partidas = Partida.objects.all()

    if termo:
        partidas = partidas.filter(
            Q(esporte__icontains=termo) |
            Q(local__icontains=termo) |
            Q(cidade__icontains=termo) |
            Q(status__icontains=termo)
        )

    return render(request, 'usuarios/buscar_partidas.html', {
        'partidas': partidas,
        'termo': termo
    })