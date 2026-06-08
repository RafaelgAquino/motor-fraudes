package com.bradesco.motor_fraudes_api.controller;

import com.bradesco.motor_fraudes_api.model.Cliente;
import com.bradesco.motor_fraudes_api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;       // 👈 Olha os imports certinhos aqui no topo!
import org.springframework.http.ResponseEntity;   // 👈
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository repository; // O nome oficial é "repository"

    @PostMapping
    public Cliente salvarNovoCliente(@RequestBody Cliente novoCliente) {
        System.out.println("🚨 RECEBIDO DO FRONT-END: " + novoCliente.getNome());
        return repository.save(novoCliente);
    }

    @GetMapping
    public java.util.List<Cliente> listarTodosOsClientes() {
        return repository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<String> fazerLogin(@RequestBody Cliente dadosLogin) {

        for (Cliente clienteSalvo : repository.findAll()) {

            // 1. Blindagem: Só analisa se o cliente do banco realmente tiver e-mail e senha cadastrados
            if (clienteSalvo.getEmail() != null && clienteSalvo.getSenha() != null) {

                // 2. Compara ignorando maiúsculas no e-mail, mas exigindo a senha exata
                if (clienteSalvo.getEmail().equalsIgnoreCase(dadosLogin.getEmail()) &&
                        clienteSalvo.getSenha().equals(dadosLogin.getSenha())) {

                    // Achou! Pode abrir a porta
                    return ResponseEntity.ok().body("{\"mensagem\": \"Acesso Permitido\"}");
                }
            }
        }

        // Se terminar a varredura e ninguém bater, bloqueia
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"erro\": \"Credenciais inválidas\"}");
    }
}