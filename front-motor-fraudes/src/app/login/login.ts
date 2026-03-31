import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html', 
  styleUrl: './login.css'
})
export class Login {
  
  // O motorista contratado logo no início (inpedindo o pisca-pisca)
  constructor(private router: Router) { }

  fazerLogin(email: string) {
    if (email !== '') {
      // Navegação instantânea
      this.router.navigate(['/pix']);
    } else {
      alert('⚠️ Por favor, digite seu e-mail corporativo.');
    }
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}