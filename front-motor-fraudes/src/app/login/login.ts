import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html', 
  styleUrl: './login.css'
})
export class Login {
  
  constructor(private router: Router) { }

  async fazerLogin(emailDigitado: string, senhaDigitada: string) {
    // 1. Verifica se o usuário não deixou nada em branco
    if (!emailDigitado || !senhaDigitada) {
      alert('⚠️ Por favor, preencha seu e-mail e senha.');
      return;
    }

    try {
      // 2. Bate na porta do Java (Render) para verificar as credenciais
      const resposta = await fetch('https://bradesco-sec-java.onrender.com/clientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada })
      });

      // 3. O Java respondeu!
      if (resposta.ok) {
        // Sucesso! A senha bate com o banco de dados.
        this.router.navigate(['/pix']);
      } else {
        // Erro 401 ou 404: Senha errada ou usuário não existe
        alert('❌ E-mail ou senha incorretos! Tente novamente.');
      }
    } catch (erro) {
      alert('💥 Falha de comunicação com o servidor de segurança.');
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}