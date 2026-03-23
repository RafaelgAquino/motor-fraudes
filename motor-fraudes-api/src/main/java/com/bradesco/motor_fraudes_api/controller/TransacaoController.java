package com.bradesco.motor_fraudes_api.controller;

import com.bradesco.motor_fraudes_api.model.Transacao;
import com.bradesco.motor_fraudes_api.service.TransacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    private final TransacaoService service;

    // O RH (Spring) injeta o nosso Analista (Service) aqui na recepção
    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    // A porta de entrada para receber novas transações
    @PostMapping
    public ResponseEntity<Transacao> receberTransacao(@RequestBody Transacao novaTransacao) {

        // O recepcionista entrega o papel para o Analista avaliar e salvar
        Transacao transacaoAnalisada = service.analisarESalvar(novaTransacao);

        // O recepcionista devolve a resposta para a internet com o selo 201 (Criado com Sucesso)
        return ResponseEntity.status(HttpStatus.CREATED).body(transacaoAnalisada);
    }
    // A porta de saída para buscar as transações
    @GetMapping
    public ResponseEntity<java.util.List<Transacao>> listarTransacoes() {

        // O recepcionista pede a lista para o Analista
        java.util.List<Transacao> lista = service.listarTodas();

        // E devolve para a internet com o selo 200 (OK - Sucesso)
        return ResponseEntity.status(HttpStatus.OK).body(lista);
    }
}
