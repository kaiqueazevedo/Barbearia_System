# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from typing import List
# from datetime import datetime

# router = APIRouter()

# # --- Modelo Pydantic ---
# class Agendamento(BaseModel):
#     id: int
#     cliente_id: int
#     barbeiro_id: int
#     servico_id: int
#     valor_pago: float
#     data: str
#     status: str

# class AgendamentoCreate(BaseModel):
#     cliente_id: int
#     barbeiro_id: int
#     servico_id: int
#     valor_pago: float
#     data: str
#     status: str

# # --- "Banco de dados" temporário ---
# agendamentos: List[Agendamento] = []

# # --- Rotas ---
# @router.get("/agendamentos", response_model=List[Agendamento])
# def listar_agendamentos():
#     return agendamentos

# @router.post("/agendamentos", response_model=Agendamento)
# def criar_agendamento(a: AgendamentoCreate):
#     novo_id = len(agendamentos) + 1
#     novo = Agendamento(id=novo_id, **a.dict())
#     agendamentos.append(novo)
#     return novo

# @router.patch("/agendamentos/{agendamento_id}/status")
# def atualizar_status(agendamento_id: int, status: dict):
#     for a in agendamentos:
#         if a.id == agendamento_id:
#             a.status = status.get("status", a.status)
#             return a
#     raise HTTPException(status_code=404, detail="Agendamento não encontrado")

# @router.delete("/agendamentos/{agendamento_id}")
# def deletar_agendamento(agendamento_id: int):
#     global agendamentos
#     agendamentos = [a for a in agendamentos if a.id != agendamento_id]
#     return {"mensagem": "Agendamento removido com sucesso"}



# routes/agendamentos.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

class Agendamento(BaseModel):
    id: int
    cliente_id: int
    barbeiro_id: int
    servico_id: int
    valor_pago: float
    data: str
    status: str

agendamentos: List[Agendamento] = []

@router.get("/agendamentos", response_model=List[Agendamento])
def listar_agendamentos():
    return agendamentos

@router.post("/agendamentos", response_model=Agendamento)
def criar_agendamento(a: Agendamento):
    agendamentos.append(a)
    return a



@app.patch("/agendamentos/{agendamento_id}/status")
def atualizar_status(agendamento_id: int, status: dict):
    for ag in agendamentos:
        if ag.id == agendamento_id:
            ag.status = status.get("status", ag.status)

            # Se mudou para "realizado", registra faturamento
            if ag.status.lower() == "realizado":
                novo_id = len(faturamentos) + 1
                faturamentos.append(Faturamento(
                    id=novo_id,
                    barbeiro_id=ag.barbeiro_id,
                    valor=ag.valor_pago,
                    data=datetime.now().strftime("%Y-%m-%d")
                ))

            return {"message": "Status atualizado e faturamento registrado"}
    raise HTTPException(status_code=404, detail="Agendamento não encontrado")
