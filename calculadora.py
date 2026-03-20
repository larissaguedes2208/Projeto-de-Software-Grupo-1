#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 20 07:14:12 2026

@author: larissaguedes
"""

def soma(a, b):
    return a + b


def subtracao(a, b):
    return a - b


def multiplicacao(a, b):
    return a * b


def divisao(a, b):
    if b == 0:
        return "Erro: divisão por zero"
    return a / b


print("=== CALCULADORA ===")
print("1 - Soma")
print("2 - Subtração")
print("3 - Multiplicação")
print("4 - Divisão")

opcao = input("Escolha uma operação: ")

a = float(input("Digite o primeiro número: "))
b = float(input("Digite o segundo número: "))

if opcao == "1":
    print("Resultado:", soma(a, b))
elif opcao == "2":
    print("Resultado:", subtracao(a, b))
elif opcao == "3":
    print("Resultado:", multiplicacao(a, b))
elif opcao == "4":
    print("Resultado:", divisao(a, b))
else:
    print("Opção inválida")