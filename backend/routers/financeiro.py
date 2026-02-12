# # routers/financeiro.py
# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from datetime import datetime
# from typing import List

# router = APIRouter(prefix="/financeiro")

# # --- Modelos ---
# class Movimento(BaseModel):
#     id: int
#     descricao: str
#     valor: float
#     tipo: str  # "entrada" ou "saida"
#     data: str

# movimentos: List[Movimento] = []
# movimento_counter = 1

# # --- Rotas ---
# @router.get("/", response_model=List[Movimento])
# def listar_movimentos():
#     return movimentos

# @router.post("/", response_model=Movimento)
# def adicionar_movimento(mov: Movimento):
#     global movimento_counter
#     mov.id = movimento_counter
#     movimento_counter += 1
#     # Ajusta o valor de acordo com tipo
#     if mov.tipo.lower() == "saida":
#         mov.valor = -abs(mov.valor)  # valor negativo
#     else:
#         mov.valor = abs(mov.valor)
#     movimentos.append(mov)
#     return mov

# @router.get("/saldo")
# def saldo_total():
#     total = sum(m.valor for m in movimentos)
#     return {"saldo": total}



# routers/financeiro.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List

router = APIRouter(prefix="/financeiro")

# Modelo para os movimentos financeiros
class Movimento(BaseModel):
    descricao: str
    tipo: str  # 'entrada' ou 'saida'
    valor: float
    data: str = None  # se não passar, usamos hoje

# Lista de movimentos em memória
movimentos: List[Movimento] = []

# Criar novo movimento
@router.post("/")
def criar_movimento(movimento: Movimento):
    if movimento.tipo not in ["entrada", "saida"]:
        raise HTTPException(status_code=400, detail="Tipo deve ser 'entrada' ou 'saida'")
    
    # Se não passar data, usamos a data de hoje
    if not movimento.data:
        movimento.data = datetime.now().strftime("%Y-%m-%d")
    
    movimentos.append(movimento)
    return {"message": "Movimento adicionado com sucesso", "movimento": movimento}

# Listar todos os movimentos
@router.get("/")
def listar_movimentos():
    return movimentos

# Faturamento diário (somatório das entradas - saídas)
@router.get("/faturamento-dia")
def faturamento_dia():
    hoje = datetime.now().strftime("%Y-%m-%d")
    total = sum(
        m.valor if m.tipo == "entrada" else -m.valor
        for m in movimentos
        if m.data == hoje
    )
    return {"data": hoje, "total": total}

# Faturamento por data específica (ex: filtrar por mês, semana ou dia)
@router.get("/faturamento")
def faturamento_filtrado(data: str = None):
    """
    Filtra movimentos por data (YYYY-MM-DD).
    Se não passar data, retorna todos os movimentos.
    """
    filtrados = movimentos
    if data:
        filtrados = [m for m in movimentos if m.data == data]
    
    total = sum(
        m.valor if m.tipo == "entrada" else -m.valor
        for m in filtrados
    )
    return {"movimentos": filtrados, "total": total}
