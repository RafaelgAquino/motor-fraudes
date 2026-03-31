// 👇 1. Importamos o ChangeDetectorRef (O radar manual do Angular)
import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-pix',
  templateUrl: './painel-pix.html',
  styleUrl: './painel-pix.css'
})
export class PainelPix {
  
  telaAtual: 'formulario' | 'alertaRisco' = 'formulario';
  scoreRisco: number = 0;
  mensagemRisco: string = '';
  dadosOriginais: any;

  // 👇 2. Injetamos o cdr no construtor
  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  sair() {
    this.router.navigate(['/login']);
  }

  async avaliarPix(origem: string, destino: string, valor: string) {
    if (!origem || !destino || !valor) {
      alert("⚠️ Preencha todos os campos antes de avaliar.");
      return;
    }

    this.dadosOriginais = { contaOrigem: origem, contaDestino: destino, valor: parseFloat(valor) };

    try {
      const resposta = await fetch('http://localhost:8080/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.dadosOriginais)
      });

      if (resposta.ok) {
        this.scoreRisco = 85; 
        this.mensagemRisco = "Alerta: Transação incompatível com o perfil comportamental do cliente.";
        this.telaAtual = 'alertaRisco';
        
        // 👇 3. A MARRETADA FINAL: Força a tela a atualizar AGORA! 👇
        this.cdr.detectChanges(); 

      } else {
        alert('❌ Erro de comunicação com o Cérebro Java.');
      }
    } catch (erro) {
      alert('💥 Falha total de rede. Verifique os servidores.');
    }
  }

  confirmarTransferencia(checkboxMarcado: boolean) {
    if (checkboxMarcado) {
      alert('💸 TRANSFERÊNCIA EFETUADA! O banco registrou sua ciência do risco.');
      this.telaAtual = 'formulario';
      this.cdr.detectChanges(); // Atualiza a tela de volta na hora
    } else {
      alert('⚠️ Você precisa assumir o risco marcando a caixa de seleção antes de transferir.');
    }
  }

  cancelarTransferencia() {
    this.telaAtual = 'formulario';
    this.cdr.detectChanges(); // Atualiza a tela de volta na hora
  }
}