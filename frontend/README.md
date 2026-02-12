#  Barbearia System --- Full Stack Management Platform

Sistema Full Stack para gerenciamento de barbearia desenvolvido com
FastAPI + React, focado em arquitetura organizada, API REST estruturada
e integração frontend/backend.

> Projeto desenvolvido com foco em prática profissional de backend,
> modelagem de dados e consumo de API.

------------------------------------------------------------------------

##  Visão Geral

O Barbearia System é uma aplicação web completa que permite:

-   Gestão de clientes
-   Cadastro de serviços
-   Controle de agendamentos
-   Controle de estoque
-   Gestão financeira
-   Integração via API REST

A aplicação foi construída seguindo separação clara de responsabilidades
entre backend e frontend.

------------------------------------------------------------------------

## Arquitetura do Projeto

###  Backend (API REST)

-   FastAPI
-   SQLite
-   SQLAlchemy
-   Uvicorn
-   Estrutura modular (rotas, models, database)

Responsável por: - Regras de negócio - Persistência de dados - Endpoints
RESTful - Integração com banco de dados - Configuração de CORS

### Frontend

-   React
-   TypeScript
-   Vite
-   CSS customizado

Responsável por: - Interface moderna - Consumo da API via HTTP -
Gerenciamento de estados - Navegação por rotas

------------------------------------------------------------------------

## Stack Tecnológica

  Camada       Tecnologia
  ------------ --------------------
  Backend      Python + FastAPI
  ORM          SQLAlchemy
  Banco        SQLite
  Frontend     React + TypeScript
  Build Tool   Vite
  API Docs     Swagger (/docs)

------------------------------------------------------------------------

## Estrutura do Projeto

Barbearia_System/ │ ├── backend/ │ ├── main.py │ ├── models/ │ ├──
routes/ │ ├── database/ │ └── requirements.txt │ ├── frontend/ │ ├──
src/ │ │ ├── components/ │ │ ├── pages/ │ │ └── services/ │ ├──
package.json │ └── vite.config.ts │ └── barbearia.db

------------------------------------------------------------------------

##  Funcionalidades Implementadas

-   CRUD completo de clientes
-   CRUD de serviços
-   CRUD de agendamentos
-   Controle de estoque
-   Módulo financeiro
-   Integração frontend + backend
-   Documentação automática da API
-   Estrutura preparada para expansão

------------------------------------------------------------------------

##  Como Executar o Projeto

### Backend

cd backend python -m venv venv source venv/bin/activate \# Linux/Mac
venv`\Scripts`{=tex}`\activate     `{=tex}\# Windows pip install -r
requirements.txt uvicorn main:app --reload

API disponível em: http://127.0.0.1:8000

Documentação: http://127.0.0.1:8000/docs

------------------------------------------------------------------------

### Frontend

cd frontend npm install npm run dev

Aplicação disponível em: http://localhost:5173

------------------------------------------------------------------------

##  Objetivos Técnicos

-   Organização de backend com FastAPI
-   Modelagem relacional
-   Separação de camadas
-   Consumo de API no React
-   Estrutura escalável

------------------------------------------------------------------------

