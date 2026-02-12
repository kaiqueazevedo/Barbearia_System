from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Item(BaseModel):
    id: int
    produto: str
    quantidade: int

estoque: List[Item] = []

@app.get("/estoque/")
def listar_estoque():
    return estoque

@app.post("/estoque/")
def adicionar_item(item: Item):
    for i in estoque:
        if i.produto == item.produto:
            i.quantidade += item.quantidade
            return i
    estoque.append(item)
    return item

@app.put("/estoque/{produto}")
def remover_item(produto: str, qtd: int):
    for i in estoque:
        if i.produto == produto:
            if i.quantidade < qtd:
                raise HTTPException(status_code=400, detail="Quantidade insuficiente")
            i.quantidade -= qtd
            if i.quantidade == 0:
                estoque.remove(i)
            return i
    raise HTTPException(status_code=404, detail="Produto não encontrado")
