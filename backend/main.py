# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()  # ⚠️ PRIMEIRO cria o app

# # Depois configura CORS
# origins = [
#     "http://localhost:5173",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# # Simulando banco em memória
# clientes = []

# @app.get("/clientes")
# def listar_clientes():
#     return clientes

# @app.post("/clientes")
# def criar_cliente(cliente: dict):
#     novo_cliente = {
#         "id": len(clientes) + 1,
#         "nome": cliente["nome"],
#         "telefone": cliente["telefone"]
#     }
#     clientes.append(novo_cliente)
#     return novo_cliente

# # Rota teste
# @app.get("/")
# def home():
#     return {"mensagem": "API Barbearia rodando "}




# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware

# # Importando as configurações que criamos nos outros arquivos
# import models
# import schemas
# from database import SessionLocal, engine

# # CRIA AS TABELAS NO BANCO DE DADOS REAL (barbearia.db)
# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # Configuração de CORS para o Vite acessar a API
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Função para conectar/desconectar do banco em cada requisição
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.get("/")
# def home():
#     return {"mensagem": "API Barbearia PRO rodando com SQLite!"}

# # --- ROTAS DE CLIENTES ---
# @app.post("/clientes", response_model=schemas.Cliente)
# def criar_cliente(cliente: schemas.ClienteCreate, db: Session = Depends(get_db)):
#     db_cliente = models.Cliente(nome=cliente.nome, telefone=cliente.telefone)
#     db.add(db_cliente)
#     db.commit()
#     db.refresh(db_cliente)
#     return db_cliente

# @app.get("/clientes", response_model=List[schemas.Cliente])
# def listar_clientes(db: Session = Depends(get_db)):
#     return db.query(models.Cliente).all()

# # --- ROTAS DE AGENDAMENTOS ---
# @app.post("/agendamentos", response_model=schemas.Agendamento)
# def criar_agendamento(agendamento: schemas.AgendamentoCreate, db: Session = Depends(get_db)):
#     # Transforma o schema em dicionário e desempacota no modelo
#     db_agendamento = models.Agendamento(**agendamento.model_dump())
#     db.add(db_agendamento)
#     db.commit()
#     db.refresh(db_agendamento)
#     return db_agendamento

# @app.get("/agendamentos", response_model=List[schemas.Agendamento])
# def listar_agendamentos(db: Session = Depends(get_db)):
#     return db.query(models.Agendamento).all()

# # --- ROTAS DE ESTOQUE (PRODUTOS) ---
# @app.post("/produtos", response_model=schemas.Produto)
# def criar_produto(produto: schemas.ProdutoCreate, db: Session = Depends(get_db)):
#     db_produto = models.Produto(**produto.model_dump())
#     db.add(db_produto)
#     db.commit()
#     db.refresh(db_produto)
#     return db_produto

# @app.get("/produtos", response_model=List[schemas.Produto])
# def listar_produtos(db: Session = Depends(get_db)):
#     return db.query(models.Produto).all()


# @app.delete("/agendamentos/{agendamento_id}")
# def eliminar_agendamento(agendamento_id: int, db: Session = Depends(get_db)):
#     db_agendamento = db.query(models.Agendamento).filter(models.Agendamento.id == agendamento_id).first()
#     if not db_agendamento:
#         raise HTTPException(status_code=404, detail="Agendamento não encontrado")
#     db.delete(db_agendamento)
#     db.commit()
#     return {"mensagem": "Eliminado com sucesso"}

# @app.get("/barbeiros", response_model=List[schemas.Barbeiro])
# def listar_barbeiros(db: Session = Depends(get_db)):
#     return db.query(models.Barbeiro).all()

# @app.post("/barbeiros", response_model=schemas.Barbeiro)
# def criar_barbeiro(barbeiro: schemas.BarbeiroCreate, db: Session = Depends(get_db)):
#     db_barbeiro = models.Barbeiro(nome=barbeiro.nome)
#     db.add(db_barbeiro)
#     db.commit()
#     db.refresh(db_barbeiro)
#     return db_barbeiro


# # main.py
# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# #from routes.agendamentos import router as agendamento_router  
# from pydantic import BaseModel
# from typing import List
# from financeiro import registrar_faturamento, faturamento_dia, faturamento_barbeiro
# from fastapi import FastAPI
# from routes import router as agendamento_router  # IMPORT CORRETO

# app = FastAPI()

# app.include_router(agendamento_router)



# # --- CORS (para permitir frontend) ---
# origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# class AgendamentoCreate(BaseModel):
#     cliente_id: int
#     barbeiro_id: int
#     servico_id: int
#     valor_pago: float
#     data: str
#     status: str

# # --- Modelos ---
# class BaseItem(BaseModel):
#     id: int
#     nome: str

# class Servico(BaseItem):
#     preco: float

# class Agendamento(BaseModel):
#     id: int
#     cliente_id: int
#     barbeiro_id: int
#     servico_id: int
#     valor_pago: float
#     data: str
#     status: str

# # --- "Banco de dados" fake para teste ---
# clientes = [BaseItem(id=1, nome="Kaique")]
# barbeiros = [BaseItem(id=1, nome="Barbeiro1")]
# servicos = [Servico(id=1, nome="Corte", preco=30.0)]
# agendamentos: List[Agendamento] = []

# # --- Rotas ---
# @app.get("/clientes", response_model=List[BaseItem])
# def listar_clientes():
#     return clientes

# @app.get("/barbeiros", response_model=List[BaseItem])
# def listar_barbeiros():
#     return barbeiros

# @app.get("/servicos", response_model=List[Servico])
# def listar_servicos():
#     return servicos

# @app.get("/agendamentos", response_model=List[Agendamento])
# def listar_agendamentos():
#     return agendamentos

# @app.post("/agendamentos", response_model=Agendamento)
# def criar_agendamento(a: Agendamento):
#     agendamentos.append(a)
#     return a

# @app.patch("/agendamentos/{agendamento_id}/status")
# def atualizar_status(agendamento_id: int, status: dict):
#     for ag in agendamentos:
#         if ag.id == agendamento_id:
#             ag.status = status.get("status", ag.status)
#             return {"message": "Status atualizado"}
#     raise HTTPException(status_code=404, detail="Agendamento não encontrado")

# @app.delete("/agendamentos/{agendamento_id}")
# def deletar_agendamento(agendamento_id: int):
#     global agendamentos
#     agendamentos = [a for a in agendamentos if a.id != agendamento_id]
#     return {"message": "Agendamento deletado"}

# @app.get("/financeiro")
# def total_dia():
#     total = faturamento_dia()
#     return {"total_dia": total}

# @app.get("/financeiro/barbeiro/{barbeiro_id}")
# def total_barbeiro(barbeiro_id: int):
#     total = faturamento_barbeiro(barbeiro_id)
#     return {"barbeiro_id": barbeiro_id, "total": total}





# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime
from routers.financeiro import router as financeiro_router

from routers.financeiro import router as financeiro_router

from fastapi import APIRouter
from pydantic import BaseModel
from typing import List


app = FastAPI()
app.include_router(financeiro_router)


# --- CORS (para permitir frontend) ---

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",   
    "http://127.0.0.1:5174",  
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Modelos ---
class BaseItem(BaseModel):
    id: int
    nome: str

class Servico(BaseItem):
    preco: float

class Agendamento(BaseModel):
    id: int
    cliente_id: int
    barbeiro_id: int
    servico_id: int
    valor_pago: float
    data: str
    status: str

class AgendamentoCreate(BaseModel):
    cliente_id: int
    barbeiro_id: int
    servico_id: int
    valor_pago: float
    data: str
    status: str

class Faturamento(BaseModel):
    barbeiro_id: int
    valor: float
    data: str

# --- "Banco de dados" fake para teste ---
clientes = [BaseItem(id=1, nome="Kaique")]
barbeiros = [BaseItem(id=1, nome="Barbeiro1")]
servicos = [Servico(id=1, nome="Corte", preco=30.0)]
agendamentos: List[Agendamento] = []
faturamentos: List[Faturamento] = []

# --- Função para registrar faturamento ---
def registrar_faturamento(barbeiro_id: int, valor: float):
    hoje = datetime.now().strftime("%Y-%m-%d")
    faturamentos.append(Faturamento(barbeiro_id=barbeiro_id, valor=valor, data=hoje))

# --- Rotas ---
@app.get("/clientes", response_model=List[BaseItem])
def listar_clientes():
    return clientes

@app.get("/barbeiros", response_model=List[BaseItem])
def listar_barbeiros():
    return barbeiros

@app.get("/servicos", response_model=List[Servico])
def listar_servicos():
    return servicos

@app.get("/agendamentos", response_model=List[Agendamento])
def listar_agendamentos():
    return agendamentos

@app.post("/agendamentos", response_model=Agendamento)
def criar_agendamento(a: AgendamentoCreate):
    novo_id = len(agendamentos) + 1
    ag = Agendamento(id=novo_id, **a.dict())
    agendamentos.append(ag)
    return ag

@app.patch("/agendamentos/{agendamento_id}/status")
def atualizar_status(agendamento_id: int, status: dict):
    for ag in agendamentos:
        if ag.id == agendamento_id:
            ag.status = status.get("status", ag.status)
            
            # Se mudou para realizado, registra no faturamento
            if ag.status.lower() == "realizado":
                registrar_faturamento(ag.barbeiro_id, ag.valor_pago)
            
            return {"message": "Status atualizado"}
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")

@app.delete("/agendamentos/{agendamento_id}")
def deletar_agendamento(agendamento_id: int):
    global agendamentos
    agendamentos = [a for a in agendamentos if a.id != agendamento_id]
    return {"message": "Agendamento deletado"}

# --- Rotas de faturamento ---
@app.get("/financeiro")
def faturamento_dia():
    hoje = datetime.now().strftime("%Y-%m-%d")
    total = sum(f.valor for f in faturamentos if f.data == hoje)
    return {"data": hoje, "total": total}

@app.get("/faturamento/barbeiro/{barbeiro_id}")
def faturamento_barbeiro(barbeiro_id: int):
    total = sum(f.valor for f in faturamentos if f.barbeiro_id == barbeiro_id)
    return {"barbeiro_id": barbeiro_id, "total": total}


# Adicionar cliente
@app.post("/clientes", response_model=BaseItem)
def criar_cliente(c: BaseItem):
    clientes.append(c)
    return c

# Adicionar barbeiro
@app.post("/barbeiros", response_model=BaseItem)
def criar_barbeiro(b: BaseItem):
    barbeiros.append(b)
    return b

# Adicionar serviço
@app.post("/servicos", response_model=Servico)
def criar_servico(s: Servico):
    servicos.append(s)
    return s



router = APIRouter()

class Movimento(BaseModel):
    id: int
    descricao: str
    entrada: float = 0
    saida: float = 0
    data: str

movimentos: List[Movimento] = []

@router.get("/financeiro", response_model=List[Movimento])
def listar_movimentos():
    return movimentos

@router.post("/financeiro", response_model=Movimento)
def adicionar_movimento(m: Movimento):
    movimentos.append(m)
    return m
