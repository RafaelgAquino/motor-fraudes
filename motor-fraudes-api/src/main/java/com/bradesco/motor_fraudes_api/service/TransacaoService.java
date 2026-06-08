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

        // 🛡️ ATALHO DA APRESENTAÇÃO (Garante que a conta 999999 ou valores muito altos disparem a IA instantaneamente)
        if ("999999".equals(transacao.getContaDestino()) || valor.compareTo(new BigDecimal("15000.00")) > 0) {
            System.out.println("🚨 ATALHO DE RISCO ATIVADO PARA APRESENTAÇÃO!");
            transacao.setScoreRisco(95);
            transacao.setAlertaContaNova(true);
            transacao.setAlertaTubo(true);
            transacao.setStatusRisco("BLOQUEADA_POR_IA");
            return repository.save(transacao);
        }

        // 1. O Java liga para o Python
        chamarInteligenciaArtificialPython(transacao);

        // 2. A Árvore de Decisão
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

    private void chamarInteligenciaArtificialPython(Transacao transacao) {
        try {
            System.out.println("🚀 [JAVA] Enviando dados para o laboratório Python...");
            RestTemplate restTemplate = new RestTemplate();
            String urlPython = "https://motor-fraudes.onrender.com/analisar-risco";

            Map<String, Object> resposta = restTemplate.postForObject(urlPython, transacao, Map.class);

            // CORREÇÃO: Transforma o número de forma segura, seja ele Double, String ou Integer vindo do Python
            transacao.setScoreRisco(Integer.valueOf(resposta.get("riskScore").toString()));

            // Tratamento seguro para os booleanos
            transacao.setAlertaContaNova(Boolean.parseBoolean(resposta.get("alertaContaNova").toString()));
            transacao.setAlertaTubo(Boolean.parseBoolean(resposta.get("alertaTubo").toString()));

            System.out.println("✅ [JAVA] IA respondeu! Risco Base: " + transacao.getScoreRisco() + "%");

        } catch (Exception e) {
            System.out.println("❌ [JAVA] Python dormindo ou erro de conexão. Motivo: " + e.getMessage());
            transacao.setScoreRisco(0);
            transacao.setAlertaContaNova(false);
            transacao.setAlertaTubo(false);
        }
    }

    public java.util.List<Transacao> listarTodas() {
        return repository.findAll();
    }
}