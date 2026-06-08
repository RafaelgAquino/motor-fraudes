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
        // Agora usando o nome correto "repository" na hora de buscar!
        for (Cliente clienteSalvo : repository.findAll()) {
            if (clienteSalvo.getEmail().equals(dadosLogin.getEmail()) &&
                    clienteSalvo.getSenha().equals(dadosLogin.getSenha())) {

                // Achou! Pode abrir a porta (Retorna status 200 OK)
                return ResponseEntity.ok().body("{\"mensagem\": \"Acesso Permitido\"}");
            }
        }

        // Se o loop terminar e não achar ninguém, bloqueia a porta
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"erro\": \"Credenciais inválidas\"}");
    }
}