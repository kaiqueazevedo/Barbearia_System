from fastapi import APIRouter

router = APIRouter()

@router.get("/servicos")
def listar_servicos():
    return {"mensagem": "Rota serviços funcionando"}
