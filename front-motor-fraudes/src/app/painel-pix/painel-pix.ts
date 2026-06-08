import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-pix',
  templateUrl: './painel-pix.html',
  styleUrl: './painel-pix.css'
})
export class PainelPix implements OnInit {
  
  nomeDoUsuario: string = '';
  telaAtual: 'formulario' | 'questionarioRisco' | 'alertaRisco' = 'formulario';
  scoreRisco: number = 0;
  mensagemRisco: string = '';
  dadosOriginais: any;
  alertaContaNova: boolean = false;
  alertaTubo: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.nomeDoUsuario = localStorage.getItem('nomeUsuario') || 'Analista Operacional';
  }

  sair() {
    localStorage.removeItem('nomeUsuario');
    this.router.navigate(['/login']);
  }

  async avaliarPix(origem: string, destino: string, valor: string) {
    if (!origem || !destino || !valor) {
      alert("⚠️ Preencha todos os campos.");
      return;
    }

    this.dadosOriginais = { 
      contaOrigem: origem, 
      contaDestino: destino, 
      valor: parseFloat(valor),
      idadeVitima: 72,
      diasContaDestino: 5,
      padraoTubo: 1,
      primeiroEnvio: 1
    };

    try {
      const resposta = await fetch('https://bradesco-sec-java.onrender.com/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.dadosOriginais)
      });

      if (resposta.ok) {
        const dadosReais = await resposta.json();
        this.scoreRisco = dadosReais.scoreRisco; 
        this.alertaContaNova = dadosReais.alertaContaNova;
        this.alertaTubo = dadosReais.alertaTubo;
        this.mensagemRisco = "Status Oficial: " + dadosReais.statusRisco;
        
        if (this.scoreRisco > 50) {
          this.telaAtual = 'questionarioRisco';
        } else {
          this.telaAtual = dadosReais.statusRisco === 'APROVADA' ? 'formulario' : 'alertaRisco';
          if (dadosReais.statusRisco === 'APROVADA') alert('✅ PIX enviado com sucesso!');
        }
        this.cdr.detectChanges(); 
      } else {
        // 👇 A MÁGICA FOI INSERIDA AQUI! O Angular agora avisa se o Java recusar.
        alert('❌ O servidor recusou a transação. Verifique se o Back-end está rodando!');
      }
    } catch (erro) {
      alert('💥 Falha de rede. O servidor pode estar dormindo ou offline.');
    }
  }

  responderQuestionario(caiuNoGolpe: boolean) {
    if (caiuNoGolpe) {
      this.scoreRisco = 100;
      this.mensagemRisco = "ALERTA MÁXIMO: Confirmação de Engenharia Social.";
    }
    this.telaAtual = 'alertaRisco';
    this.cdr.detectChanges();
  }

  confirmarTransferencia(checkboxMarcado: boolean) {
    if (checkboxMarcado) {
      alert('💸 TRANSFERÊNCIA EFETUADA APÓS ASSINATURA DE TERMO!');
      this.telaAtual = 'formulario';
      this.cdr.detectChanges(); 
    } else {
      alert('⚠️ Marque a caixa assumindo o risco antes de prosseguir.');
    }
  }

  cancelarTransferencia() {
    this.telaAtual = 'formulario';
    this.cdr.detectChanges(); 
  }
}