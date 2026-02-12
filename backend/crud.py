def criar_agendamento(db: Session, agendamento):
    existente = db.query(models.Agendamento).filter(
        models.Agendamento.data_hora == agendamento.data_hora,
        models.Agendamento.status == "Agendado"
    ).first()

    if existente:
        raise Exception("Horário já ocupado")

    novo = models.Agendamento(**agendamento.dict())
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

def finalizar_agendamento(db: Session, agendamento_id: int):
    agendamento = db.query(models.Agendamento).filter(
        models.Agendamento.id == agendamento_id
    ).first()

    agendamento.status = "Finalizado"

    servico = db.query(models.Servico).filter(
        models.Servico.id == agendamento.servico_id
    ).first()

    entrada = models.Financeiro(
        descricao="Serviço realizado",
        valor=servico.preco,
        tipo="Entrada"
    )

    db.add(entrada)
    db.commit()

    return {"mensagem": "Finalizado e financeiro registrado"}
