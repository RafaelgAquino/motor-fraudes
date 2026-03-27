import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // O motorista do Angular que troca as telas
  private router = inject(Router);

  fazerLogin(email: string) {
    if (email !== '') {
      // Se digitou algo, simula o login e joga pro Painel PIX
      this.router.navigate(['/pix']);
    } else {
      alert('⚠️ Por favor, digite seu e-mail corporativo.');
    }
  }
  // 👇 NOVA FUNÇÃO AQUI 👇
  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}