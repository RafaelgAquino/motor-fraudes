import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-motor-fraudes');

  // 👇 NOSSA FUNÇÃO TÁTICA DE DISPARO 👇
  async dispararPix(origem: string, destino: string, valor: string) {
    // 1. Monta o pacote de dados (O Payload JSON)
    const payload = {
      contaOrigem: origem,
      contaDestino: destino,
      valor: parseFloat(valor)
    };

    try {
      // 2. O Míssil: Dispara contra o Java
      const resposta = await fetch('http://localhost:8080/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // 3. Lê o resultado do radar
      if (resposta.ok) {
        const dados = await resposta.json();
        alert('🚨 AVALIAÇÃO DO MOTOR: A transação foi ' + dados.statusRisco);
      } else {
        alert('❌ Erro: O Cérebro Java recusou a conexão. Status: ' + resposta.status);
      }
      
    } catch (erro) {
      alert('💥 Falha total de comunicação. O IntelliJ (Java) está rodando?');
    }
  }
}
