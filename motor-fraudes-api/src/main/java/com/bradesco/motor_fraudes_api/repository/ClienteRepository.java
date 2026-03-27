package com.bradesco.motor_fraudes_api.repository; // Mantenha a sua linha de package original!

import com.bradesco.motor_fraudes_api.model.Cliente; // Importe a classe que criamos acima
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Só isso! Essa linha vazia já dá ao Java o poder de Salvar, Deletar, Buscar e Atualizar clientes!
}
