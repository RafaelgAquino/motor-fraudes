package com.bradesco.motor_fraudes_api.service;

import com.bradesco.motor_fraudes_api.model.Transacao;
import com.bradesco.motor_fraudes_api.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate; // A ferramenta que faz o Java acessar a internet/rede

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

        // 1. O Java liga de verdade para o laboratório Python
        int scoreDeRiscoIA = chamarInteligenciaArtificialPython(transacao);

        // 2. A Árvore de Decisão com a IA Real
        if (scoreDeRiscoIA > 80) {
            transacao.setStatusRisco("BLOQUEADA_POR_IA");
        } else if (valor.compareTo(new BigDecimal("10000.00")) > 0) {
            transacao.setStatusRisco("BLOQUEADA_POR_VALOR");
        } else if (scoreDeRiscoIA > 50 || valor.compareTo(new BigDecimal("5000.00")) > 0) {
            transacao.setStatusRisco("EM_ANALISE_HUMANA");
        } else {
            transacao.setStatusRisco("APROVADA");
        }

        return repository.save(transacao);
    }

    // =========================================================================
    // A PONTE DE COMUNICAÇÃO: Java conversando com Python via HTTP
    // =========================================================================
    private int chamarInteligenciaArtificialPython(Transacao transacao) {
        try {
            System.out.println("🚀 [JAVA] Enviando transação para o laboratório Python...");

            // O "Telefone" do Spring Boot (o nosso Insomnia embutido)
            RestTemplate restTemplate = new RestTemplate();

            // O endereço do nosso laboratório Python
            String urlPython = "http://localhost:8000/analisar-risco";

            // Fazendo o disparo (POST) e recebendo a resposta mágica em formato de Mapa/Dicionário
            Map resposta = restTemplate.postForObject(urlPython, transacao, Map.class);

            // Extraindo a nota de dentro do JSON {"riskScore": 95} que o Python devolveu
            int nota = (Integer) resposta.get("riskScore");

            System.out.println("✅ [JAVA] O Python respondeu! Risco: " + nota + "%");
            return nota;

        } catch (Exception e) {
            // Se o servidor Python estiver desligado, o Java não quebra! Ele assume uma postura de segurança.
            System.out.println("❌ [JAVA] Erro de conexão com a IA. Motivo: " + e.getMessage());
            return 0;
        }
    }

    public java.util.List<Transacao> listarTodas() {
        return repository.findAll();
    }
}
