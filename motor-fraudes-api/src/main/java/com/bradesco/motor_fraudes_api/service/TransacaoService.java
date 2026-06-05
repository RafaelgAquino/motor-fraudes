package com.bradesco.motor_fraudes_api.service;

import com.bradesco.motor_fraudes_api.model.Transacao;
import com.bradesco.motor_fraudes_api.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public Transacao analisarESalvar(Transacao transacao) {
        transacao.setDataHora(LocalDateTime.now());
        BigDecimal valor = transacao.getValor();

        // 1. O Java liga para o Python e injeta os resultados no objeto transacao
        chamarInteligenciaArtificialPython(transacao);

        // 2. A Árvore de Decisão com a IA Híbrida
        if (transacao.getScoreRisco() != null && transacao.getScoreRisco() > 80) {
            transacao.setStatusRisco("BLOQUEADA_POR_IA");
        } else if (valor.compareTo(new BigDecimal("10000.00")) > 0) {
            transacao.setStatusRisco("BLOQUEADA_POR_VALOR");
        } else if ((transacao.getScoreRisco() != null && transacao.getScoreRisco() > 50) || valor.compareTo(new BigDecimal("5000.00")) > 0) {
            transacao.setStatusRisco("EM_ANALISE_HUMANA");
        } else {
            transacao.setStatusRisco("APROVADA");
        }

        return repository.save(transacao);
    }

    // =========================================================================
    // A PONTE DE COMUNICAÇÃO: Lendo os alertas múltiplos do Python
    // =========================================================================
    private void chamarInteligenciaArtificialPython(Transacao transacao) {
        try {
            System.out.println("🚀 [JAVA] Enviando Matriz Híbrida para o laboratório Python...");
            RestTemplate restTemplate = new RestTemplate();
            String urlPython = "http://localhost:8000/analisar-risco";

            // Recebe o pacote completo (Score + Alertas)
            Map<String, Object> resposta = restTemplate.postForObject(urlPython, transacao, Map.class);

            // Injeta as informações recebidas do Python de volta na Transação
            transacao.setScoreRisco((Integer) resposta.get("riskScore"));
            transacao.setAlertaContaNova((Boolean) resposta.get("alertaContaNova"));
            transacao.setAlertaTubo((Boolean) resposta.get("alertaTubo"));

            System.out.println("✅ [JAVA] IA respondeu! Risco Base: " + transacao.getScoreRisco() + "%");

        } catch (Exception e) {
            System.out.println("❌ [JAVA] Erro de conexão com a IA. Motivo: " + e.getMessage());
            transacao.setScoreRisco(0);
            transacao.setAlertaContaNova(false);
            transacao.setAlertaTubo(false);
        }
    }

    public java.util.List<Transacao> listarTodas() {
        return repository.findAll();
    }
}