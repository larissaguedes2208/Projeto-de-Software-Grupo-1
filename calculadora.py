#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 20 07:14:12 2026

@author: larissaguedes
"""

def soma(x, y):
    return x + y


def subtracao(x, y):
    return x - y


def multiplicacao(x, y):
    return x * y


def divisao(x, y):
    if y == 0:
        return "Erro: divisão por zero"
    return x / y

print("Soma")
print("Subtração")
print("Multiplicação")
print("Divisão")

opcao = input("Escolha uma operação: ")

x = float(input("Informe o primeiro número: "))
y = float(input("Informe o segundo número: "))

if opcao == "Soma":
    print("Resultado:", soma(x, y))
elif opcao == "Subtração":
    print("Resultado:", subtracao(x, y))
elif opcao == "Multiplicação":
    print("Resultado:", multiplicacao(x, y))
elif opcao == "Divisão":
    print("Resultado:", divisao(x, y))
else:
    print("Opção inexistente")
