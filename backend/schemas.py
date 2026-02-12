# from pydantic import BaseModel
# from typing import List, Optional

# class ClienteBase(BaseModel):
#     nome: str
#     telefone: str

# class ClienteCreate(ClienteBase):
#     pass

# class Cliente(ClienteBase):
#     id: int
#     class Config:
#         from_attributes = True


# from pydantic import BaseModel
# from typing import List, Optional

# class AgendamentoBase(BaseModel):
#     servico: str
#     data: str
#     cliente_id: int

# class AgendamentoCreate(AgendamentoBase):
#     pass

# class Agendamento(AgendamentoBase):
#     id: int
#     class Config:
#         from_attributes = True

# class ClienteBase(BaseModel):
#     nome: str
#     telefone: str

# class ClienteCreate(ClienteBase):
#     pass

# class Cliente(ClienteBase):
#     id: int
#     agendamentos: List[Agendamento] = [] # Mostra os agendamentos do cliente
#     class Config:
#         from_attributes = True

# class ProdutoBase(BaseModel):
#     nome: str
#     quantidade: int
#     preco_venda: float
#     preco_custo: float

# class ProdutoCreate(ProdutoBase):
#     pass

# class Produto(ProdutoBase):
#     id: int
#     class Config:
#         from_attributes = True

# class ServicoCreate(BaseModel):
#     nome: str
#     preco: float

# class Servico(ServicoCreate):
#     id: int
#     class Config: from_attributes = True

# class BarbeiroCreate(BaseModel):
#     nome: str

# class Barbeiro(BarbeiroCreate):
#     id: int
#     class Config: from_attributes = True

# class AgendamentoCreate(BaseModel):
#     servico: str
#     valor: float # <-- Obrigatório agora
#     data: str
#     cliente_id: int
#     barbeiro_id: int # <-- Obrigatório agora

# Atualize a classe Agendamento (saída) para incluir o valor e o id do barbeiro

from pydantic import BaseModel
from typing import List, Optional

# --- SERVIÇOS ---
class ServicoBase(BaseModel):
    nome: str
    preco: float

class ServicoCreate(ServicoBase): 
    pass

class Servico(ServicoBase):
    id: int
    class Config: 
        from_attributes = True

# --- BARBEIROS ---
class BarbeiroBase(BaseModel):
    nome: str

class BarbeiroCreate(BarbeiroBase):
    pass
    
class Barbeiro(BarbeiroBase):
    id: int
    class Config: 
        from_attributes = True

# --- CLIENTES ---
class ClienteBase(BaseModel):
    nome: str
    telefone: str

class ClienteCreate(ClienteBase):
    pass

class Cliente(ClienteBase):
    id: int
    class Config: 
        from_attributes = True

# --- AGENDAMENTOS (FILA) ---
class AgendamentoBase(BaseModel):
    cliente_id: int
    barbeiro_id: int
    servico_id: int
    valor_pago: float
    data: Optional[str] = None
    status: Optional[str] = "Em Espera"

class AgendamentoCreate(AgendamentoBase):
    pass

class Agendamento(AgendamentoBase):
    id: int
    class Config:
        from_attributes = True