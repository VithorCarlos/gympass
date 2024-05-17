# Gympass Application

## How to execute app on localhost:

1: Change the DATABASE_URL in your .env to: `postgresql://POSTGRESQL_USERNAME:POSTGRESQL_PASSWORD@localhost:5432/apisolid?schema=public`

2: Run the following command on CMD: `npm install && npm run dev`

## How to execute app on Docker:

1: Change the DATABASE_URL in your .env to: `postgresql://root:root@db:5432/apisolid?schema=public`

2: Run the following command on CMD: `npm install && docker-compose up -d && npm run dev`

3: On CMD App Root, execute these following steps: 

  3.1 - `docker exect -it api_gym /bin/sh`
  
  3.2 - `npx prisma migration deploy`
  
  3.3 - `exit`

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (10KM);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
