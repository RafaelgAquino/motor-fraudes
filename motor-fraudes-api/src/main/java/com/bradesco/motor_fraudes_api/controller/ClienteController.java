package com.bradesco.motor_fraudes_api.controller; // Mantenha a sua linha de package original!

import com.bradesco.motor_fraudes_api.model.Cliente;
import com.bradesco.motor_fraudes_api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @PostMapping
    public Cliente salvarNovoCliente(@RequestBody Cliente novoCliente) {
        System.out.println("🚨 RECEBIDO DO FRONT-END: " + novoCliente.getNome());

        // Salva no banco de dados do PostgreSQL e já devolve o cliente com o ID preenchido
        return repository.save(novoCliente);
    }

    // 👇 A Porta de Saída (Para você ver os cadastros no navegador)
    @GetMapping
    public java.util.List<Cliente> listarTodosOsClientes() {
        // O Java vai no banco, pega a tabela inteira e devolve como uma lista!
        return repository.findAll();
    }
}
