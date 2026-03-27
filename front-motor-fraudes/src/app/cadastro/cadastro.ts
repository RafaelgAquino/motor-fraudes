import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 👈 Se estiver no construtor abaixo, ele não vai ficar cinza!

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html', 
  styleUrl: './cadastro.css'      
})
export class Cadastro {
  
  // 👇 A TÁTICA INFALÍVEL: Usar o construtor para injetar o Router
  constructor(private router: Router) { }

  // Função para voltar ao login se o usuário desistir do cadastro
  irParaLogin() {
    this.router.navigate(['/login']);
  }

  // A função principal
  async salvarCadastro(nomeDigitado: string, idadeDigitada: string, rendaDigitada: string) {
    const payload = {
      nome: nomeDigitado,
      idade: parseInt(idadeDigitada),
      renda: parseFloat(rendaDigitada)
    };

    try {
      const resposta = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resposta.ok) {
        alert(`✅ Sucesso! O perfil de ${payload.nome} foi ativado com sucesso!`);
        
        // Agora o TypeScript sabe 100% quem é o "router"! 🚀
        this.router.navigate(['/pix']); 
        
      } else {
        alert('❌ Erro: O Cérebro Java recusou os dados. Status: ' + resposta.status);
      }
    } catch (erro) {
      alert('💥 Falha total de conexão. O servidor Java (IntelliJ) está ligado?');
    }
  }
}