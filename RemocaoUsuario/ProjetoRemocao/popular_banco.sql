-- Popular banco de dados do sistema PlayMatch
-- Dados fictícios para teste do sistema

-- Inserindo usuários

INSERT INTO Usuario (id_usuario, nome, email, senha)
VALUES
(1, 'Miguel Ribeiro', 'miguel@email.com', '123456'),
(2, 'João Silva', 'joao@email.com', '123456'),
(3, 'Lucas Almeida', 'lucas@email.com', '123456'),
(4, 'Pedro Santos', 'pedro@email.com', '123456');

-- Inserindo locais

INSERT INTO Local (id_local, nome, endereco, cidade)
VALUES
(1, 'Campo do Aterro', 'Aterro do Flamengo', 'Rio de Janeiro'),
(2, 'Quadra da Praia', 'Praia de Copacabana - Posto 4', 'Rio de Janeiro'),
(3, 'Ginásio Central', 'Rua das Laranjeiras, 100', 'Rio de Janeiro');

-- Inserindo partidas

INSERT INTO Partida (id_partida, esporte, data, horario, num_jogadores, status, id_criador, id_local)
VALUES
(1, 'Futebol', '2026-06-10', '18:00', 10, 'Aberta', 1, 1),
(2, 'Vôlei', '2026-06-12', '16:00', 8, 'Aberta', 2, 2),
(3, 'Basquete', '2026-06-15', '20:00', 12, 'Lotada', 3, 3);

-- Inserindo participações

INSERT INTO Participacao (id_participacao, id_usuario, id_partida)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 3);