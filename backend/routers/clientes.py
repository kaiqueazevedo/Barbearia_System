from fastapi import APIRouter

router = APIRouter()

@router.get("/clientes")
def listar_clientes():
    return {"mensagem": "Rota clientes funcionando"}
