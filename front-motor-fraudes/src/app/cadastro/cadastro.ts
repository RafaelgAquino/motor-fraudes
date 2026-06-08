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
  async salvarCadastro(nomeDigitado: string, idadeDigitada: string, rendaDigitada: string, email: string, senhaDigitada: string, confirmarSenhaDigitada: string) {
    
    // 1. Validação da Senha
    if (senhaDigitada !== confirmarSenhaDigitada) {
      alert("⚠️ Ops! As senhas não coincidem. Digite novamente.");
      return; 
    }

    // 2. Montando o Pacote Limpo
    const payload = {
      nome: nomeDigitado,
      idade: parseInt(idadeDigitada),
      renda: parseFloat(rendaDigitada),
      email: email,
      senha: senhaDigitada
    };

    try {
      // 3. Enviando para o Cérebro (Render)
      const resposta = await fetch('https://bradesco-sec-java.onrender.com/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resposta.ok) {
        alert(`✅ Sucesso! O perfil comportamental de ${payload.nome} foi salvo no Banco de Dados!`);
        this.router.navigate(['/login']); // Redireciona para o login após o sucesso
      } else {
        alert('❌ Erro ao salvar o cadastro.');
      }
    } catch (erro) {
      alert('💥 Falha de comunicação com o servidor.');
    }
  }
}