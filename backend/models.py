# from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship
# from database import Base

# class Cliente(Base):
#     __tablename__ = "clientes"

#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     telefone = Column(String)

#     agendamentos = relationship("Agendamento", back_populates="cliente")


# class Agendamento(Base):
#     __tablename__ = "agendamentos"

#     id = Column(Integer, primary_key=True, index=True)
#     servico = Column(String)
#     data = Column(String)
#     cliente_id = Column(Integer, ForeignKey("clientes.id"))

#     cliente = relationship("Cliente", back_populates="agendamentos")



# from sqlalchemy import Column, Integer, String, ForeignKey
# from sqlalchemy.orm import relationship
# from database import Base

# class Produto(Base):
#     __tablename__ = "produtos"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     quantidade = Column(Integer, default=0)
#     preco_venda = Column(Float)
#     preco_custo = Column(Float)


# class Cliente(Base):
#     __tablename__ = "clientes"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     telefone = Column(String)
#     agendamentos = relationship("Agendamento", back_populates="cliente")

# class Agendamento(Base):
#     __tablename__ = "agendamentos"
#     id = Column(Integer, primary_key=True, index=True)
#     servico = Column(String)
#     data = Column(String)
#     cliente_id = Column(Integer, ForeignKey("clientes.id"))
#     cliente = relationship("Cliente", back_populates="agendamentos")

# class Servico(Base):
#     __tablename__ = "servicos"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     preco = Column(Float)

# class Barbeiro(Base):
#     __tablename__ = "barbeiros"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)

# class Agendamento(Base):
#     __tablename__ = "agendamentos"
#     id = Column(Integer, primary_key=True, index=True)
#     servico = Column(String)
#     valor = Column(Float) # <-- Novo campo
#     data = Column(String)
#     cliente_id = Column(Integer, ForeignKey("clientes.id"))
#     barbeiro_id = Column(Integer, ForeignKey("barbeiros.id")) # <-- Novo vínculo

#     cliente = relationship("Cliente", back_populates="agendamentos")
#     barbeiro = relationship("Barbeiro")

# from sqlalchemy import Column, Integer, String, Float, ForeignKey
# from database import Base

# class Cliente(Base):
#     __tablename__ = "clientes"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String); telefone = Column(String)

# class Barbeiro(Base):
#     __tablename__ = "barbeiros"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)

# class Servico(Base):
#     __tablename__ = "servicos"
#     id = Column(Integer, primary_key=True, index=True)
#     nome = Column(String)
#     preco = Column(Float)

# class Agendamento(Base):
#     __tablename__ = "agendamentos"
#     id = Column(Integer, primary_key=True, index=True)
#     data = Column(String)
#     cliente_id = Column(Integer, ForeignKey("clientes.id"))
#     barbeiro_id = Column(Integer, ForeignKey("barbeiros.id"))
#     servico_id = Column(Integer, ForeignKey("servicos.id"))
#     valor_pago = Column(Float) # Valor no momento da venda (pode ter desconto)

from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

from pydantic import BaseModel
from typing import List
from datetime import datetime



class Faturamento(BaseModel):
    id: int
    barbeiro_id: int
    valor: float
    data: str  # YYYY-MM-DD

    faturamentos: List[Faturamento] = []

class Cliente(Base):
    __tablename__ = "clientes"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    telefone = Column(String)

class Barbeiro(Base):
    __tablename__ = "barbeiros"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)

class Servico(Base):
    __tablename__ = "servicos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    preco = Column(Float)

class Agendamento(Base):
    __tablename__ = "agendamentos"
    # ESTA LINHA ABAIXO É A QUE ESTAVA FALTANDO OU ERRADA:
    id = Column(Integer, primary_key=True, index=True) 
    data = Column(String, nullable=True) # Agora opcional como você pediu
    cliente_id = Column(Integer, ForeignKey("clientes.id"))
    barbeiro_id = Column(Integer, ForeignKey("barbeiros.id"))
    servico_id = Column(Integer, ForeignKey("servicos.id"))
    valor_pago = Column(Float)
    status = Column(String, default="Marcado")