package com.bradesco.motor_fraudes_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String contaOrigem;

    @Column(nullable = false, length = 50)
    private String contaDestino;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    @Column(length = 20)
    private String statusRisco;

    @Column
    private Integer scoreRisco;

    // --- NOVOS CAMPOS DE ENTRADA (O que o Angular manda) ---
    @Column
    private Integer idadeVitima;

    @Column
    private Integer diasContaDestino;

    @Column
    private Integer padraoTubo; // 0 ou 1

    @Column
    private Integer primeiroEnvio; // 0 ou 1

    // --- NOVOS CAMPOS DE SAÍDA (O que o Python devolve) ---
    @Column
    private Boolean alertaContaNova;

    @Column
    private Boolean alertaTubo;
}