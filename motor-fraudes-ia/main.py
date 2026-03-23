from fastapi import FastAPI
from pydantic import BaseModel
import random

# Inicia o servidor do Laboratório
app = FastAPI()

# Cria o "Molde" do papel que o Java vai nos enviar
class Transacao(BaseModel):
    contaOrigem: str
    contaDestino: str
    valor: float

# O Guichê de atendimento do Python
@app.post("/analisar-risco")
def analisar_risco(transacao: Transacao):
    print(f"🕵️ [RECON] Analisando alvo: {transacao.contaOrigem} -> {transacao.contaDestino} | R${transacao.valor}")

    score_risco = 0

    # Regra 1: Blacklist (A nossa conta de laranja mapeada pelo Red Team)
    if transacao.contaDestino == "98765-4":
        score_risco += 80

    # Regra 2: Anomalia de Valor
    if transacao.valor > 10000:
        score_risco += 15

    # Fator de Incerteza (Simulando o cálculo matemático de uma Rede Neural)
    score_risco += random.randint(0, 5)

    # Garante que a nota nunca passe de 100%
    score_risco = min(score_risco, 100)

    print(f"🚨 [ALERTA] Score Final Calculado: {score_risco}%")
    
    # Devolve a nota em formato JSON para o Java ler
    return {"riskScore": score_risco}