import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-pix',
  templateUrl: './painel-pix.html',
  styleUrl: './painel-pix.css'
})
export class PainelPix {
  
  // Três estados de tela agora!
  telaAtual: 'formulario' | 'questionarioRisco' | 'alertaRisco' = 'formulario';
  
  scoreRisco: number = 0;
  mensagemRisco: string = '';
  dadosOriginais: any;

  // Alertas recebidos do Python para montar o questionário
  alertaContaNova: boolean = false;
  alertaTubo: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  sair() {
    this.router.navigate(['/login']);
  }

  async avaliarPix(origem: string, destino: string, valor: string) {
    if (!origem || !destino || !valor) {
      alert("⚠️ Preencha todos os campos antes de avaliar.");
      return;
    }

    // Simulando os dados do cliente logado e do golpista para testar a Matriz Híbrida
    // Num cenário real, o Angular só manda o valor, e o Java busca o resto no banco.
    this.dadosOriginais = { 
      contaOrigem: origem, 
      contaDestino: destino, 
      valor: parseFloat(valor),
      idadeVitima: 72,          // Simulando um idoso
      diasContaDestino: 5,      // Simulando conta nova (Ativa o alertaContaNova)
      padraoTubo: 1,            // Simulando conta tubo (Ativa o alertaTubo)
      primeiroEnvio: 1
    };

    try {
      const resposta = await fetch('http://localhost:8080/transacoes', {
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
        
        // A Fricção Positiva: Se a IA detectar risco, entra o questionário antes do bloqueio
        if (this.scoreRisco > 50) {
          this.telaAtual = 'questionarioRisco';
        } else {
          // Se for seguro (Score baixo), aprova direto ou vai pro alerta (se for valor alto)
          this.telaAtual = dadosReais.statusRisco === 'APROVADA' ? 'formulario' : 'alertaRisco';
          if (dadosReais.statusRisco === 'APROVADA') alert('✅ PIX enviado com sucesso!');
        }

        this.cdr.detectChanges(); 
      } else {
        alert('❌ Erro de comunicação com o Cérebro Java.');
      }
    } catch (erro) {
      alert('💥 Falha total de rede. Verifique os servidores.');
    }
  }

  // Resposta do Questionário de Engenharia Social
  responderQuestionario(caiuNoGolpe: boolean) {
    if (caiuNoGolpe) {
      // Se ele confessou o padrão do golpe, o Risco vai pra 100%
      this.scoreRisco = 100;
      this.mensagemRisco = "ALERTA MÁXIMO: O usuário confirmou táticas de Engenharia Social.";
    }
    // Independente da resposta, depois do questionário ele vai para a tela final de decisão
    this.telaAtual = 'alertaRisco';
    this.cdr.detectChanges();
  }

  confirmarTransferencia(checkboxMarcado: boolean) {
    if (checkboxMarcado) {
      alert('💸 TRANSFERÊNCIA EFETUADA! O banco registrou sua ciência do risco.');
      this.telaAtual = 'formulario';
      this.cdr.detectChanges(); 
    } else {
      alert('⚠️ Você precisa assumir o risco marcando a caixa de seleção antes de transferir.');
    }
  }

  cancelarTransferencia() {
    this.telaAtual = 'formulario';
    this.cdr.detectChanges(); 
  }
}