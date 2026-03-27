package com.bradesco.motor_fraudes_api.model; // Mantenha o seu pacote original!

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
@Data // 👈 Mágica 1: Cria todos os Getters, Setters, toString, equals e hashCode!
@NoArgsConstructor // 👈 Mágica 2: Cria o construtor vazio (o Spring e o JPA exigem isso para funcionar)
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Integer idade;
    private Double renda;

}