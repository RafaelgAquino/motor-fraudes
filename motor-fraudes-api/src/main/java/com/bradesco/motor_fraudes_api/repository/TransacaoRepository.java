package com.bradesco.motor_fraudes_api.repository;

import com.bradesco.motor_fraudes_api.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
}