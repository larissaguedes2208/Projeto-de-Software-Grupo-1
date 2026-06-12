from django.db import models


class Partida(models.Model):
    esporte = models.CharField(max_length=50)
    local = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    data = models.DateField()
    horario = models.TimeField()
    num_jogadores = models.IntegerField()
    status = models.CharField(max_length=30, default='Aberta')

    def __str__(self):
        return f'{self.esporte} - {self.local}'
