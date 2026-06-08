import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html', 
  styleUrl: './cadastro.css'      
})
export class Cadastro {
  
  constructor(private router: Router) { }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  // A sua função principal de salvar, reconectada!
  // A sua função principal de salvar, reconectada na NUVEM! ☁️
  async salvarCadastro(nomeDigitado: string, idadeDigitada: string, rendaDigitada: string) {
    const payload = {
      nome: nomeDigitado,
      idade: parseInt(idadeDigitada),
      renda: parseFloat(rendaDigitada)
    };

    try {
      // 🎯 OLHA A MUDANÇA AQUI: Apontando direto para o Render!
      const resposta = await fetch('https://bradesco-sec-java.onrender.com/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resposta.ok) {
        alert(`✅ Sucesso! O perfil comportamental de ${payload.nome} foi salvo no Banco de Dados!`);
        
        // Redirecionamento instantâneo para a área logada (PIX)! 🚀
        this.router.navigate(['/pix']); 
        
      } else {
        alert('❌ Erro: O Cérebro Java recusou os dados. Status: ' + resposta.status);
      }
    } catch (erro) {
      alert('💥 Falha total de conexão. O servidor no Render está ligado e respondendo?');
    }
  }
}