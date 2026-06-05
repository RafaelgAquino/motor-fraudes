import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

print("🔬 Iniciando Laboratório de Matriz Híbrida (Vítima + Atacante)...")

# O PASSADO (A Matriz de Dados de Alta Fidelidade)
# padrao_tubo: 1 (Dinheiro entra e sai na hora) | 0 (Conta normal)
# primeiro_envio: 1 (Sim) | 0 (Não, já transferiu antes)
dados_historicos = {
    'idade_vitima':       [22,  75,  35,  68,  45,  72,  25,  65,  40,  55,  80,  19],
    'dias_conta_destino': [300, 2,   150, 1,   500, 5,   10,  3,   800, 4,   1,   100],
    'padrao_tubo':        [0,   1,   0,   1,   0,   1,   1,   1,   0,   1,   1,   0],
    'primeiro_envio':     [0,   1,   0,   1,   0,   1,   1,   1,   0,   1,   1,   1],
    'fraude_confirmada':  [0,   1,   0,   1,   0,   1,   0,   1,   0,   1,   1,   0]
}
# 👆 A IA vai aprender que: Idoso + Conta Nova + Tubo + Primeiro Envio = Golpe clássico do Laranja/Falso Parente.

tabela = pd.DataFrame(dados_historicos)

# O que a IA pode olhar (As 4 variáveis)
X = tabela[['idade_vitima', 'dias_conta_destino', 'padrao_tubo', 'primeiro_envio']] 
y = tabela['fraude_confirmada']                       

print("🧠 Treinando a Floresta Aleatória Híbrida...")
modelo_ia = RandomForestClassifier(n_estimators=100, random_state=42)
modelo_ia.fit(X, y) 

joblib.dump(modelo_ia, 'cerebro_antifraude.pkl')
print("✅ IA Treinada! Matriz Híbrida salva com sucesso.")