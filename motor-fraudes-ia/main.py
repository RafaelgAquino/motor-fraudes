from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

print("🧠 Carregando Motor Híbrido Zero Trust...")
modelo_ia = joblib.load('cerebro_antifraude.pkl')

# O Novo Molde de Dados
class Transacao(BaseModel):
    contaOrigem: str
    contaDestino: str
    valor: float
    idadeVitima: int
    diasContaDestino: int
    padraoTubo: int
    primeiroEnvio: int

@app.post("/analisar-risco")
def analisar_risco(transacao: Transacao):
    print(f"🕵️ Analisando: {transacao.contaOrigem} -> {transacao.contaDestino} | R${transacao.valor}")

    # Monta os dados exatamente como a IA aprendeu
    dados_pix_agora = pd.DataFrame({
        'idade_vitima': [transacao.idadeVitima],
        'dias_conta_destino': [transacao.diasContaDestino],
        'padrao_tubo': [transacao.padraoTubo],
        'primeiro_envio': [transacao.primeiroEnvio]
    })

    # Calcula o "Risco Base" puramente matemático
    probabilidades = modelo_ia.predict_proba(dados_pix_agora)
    score_base = int(probabilidades[0][1] * 100)

    print(f"🚨 Risco Base (Matemático): {score_base}%")
    
    # Devolve o risco base e os alertas para o Angular montar o questionário
    return {
        "riskScore": score_base,
        "alertaContaNova": transacao.diasContaDestino < 30,
        "alertaTubo": transacao.padraoTubo == 1
    }