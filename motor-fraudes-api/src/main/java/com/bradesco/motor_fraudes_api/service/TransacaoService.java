package com.bradesco.motor_fraudes_api.service;

import com.bradesco.motor_fraudes_api.model.Transacao;
import com.bradesco.motor_fraudes_api.repository.TransacaoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;

    // Injeção de Dependência via Construtor (O jeito Sênior)
    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    public Transacao analisarESalvar(Transacao transacao) {
        // 1. Preenche a data e hora exata em que a transação chegou no motor
        transacao.setDataHora(LocalDateTime.now());

        // 2. O Cérebro: Regras de Negócio de Fraude (Versão 1.0)
        BigDecimal valor = transacao.getValor();

        if (valor.compareTo(new BigDecimal("10000.00")) > 0) {
            // Se for maior que 10.000, bloqueia na hora (Muito Risco)
            transacao.setStatusRisco("BLOQUEADA");
        } else if (valor.compareTo(new BigDecimal("5000.00")) > 0) {
            // Se for entre 5.000 e 10.000, vai para análise humana
            transacao.setStatusRisco("EM_ANALISE");
        } else {
            // Menor que 5.000, passa direto
            transacao.setStatusRisco("APROVADA");
        }

        // 3. Depois de carimbar o status, manda o Gerente do Cofre salvar no banco
        return repository.save(transacao);
    }
    // Método para o Analista ir no cofre e buscar a lista inteira
    public java.util.List<Transacao> listarTodas() {
        return repository.findAll(); // O Gerente do cofre (Spring Data) já sabe fazer isso sozinho!
    }
}
