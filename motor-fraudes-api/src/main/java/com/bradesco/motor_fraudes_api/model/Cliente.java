package com.bradesco.motor_fraudes_api.model; // Mantenha o seu pacote original!

import jakarta.persistence.*;
import lombok.Data;
import java.util.Random;

@Entity
@Table(name = "clientes")
@Data // 👈 Mágica 1: Cria todos os Getters, Setters, toString, equals e hashCode!
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Integer idade;
    private Double renda;
    private String email;
    private String senha;
    private String numeroConta;

    public Cliente() {
        // Toda vez que um cliente nasce, ele ganha uma conta aleatória de 6 dígitos
        Random random = new Random();
        int numeroGerado = 100000 + random.nextInt(900000);
        this.numeroConta = String.valueOf(numeroGerado);
    }
}