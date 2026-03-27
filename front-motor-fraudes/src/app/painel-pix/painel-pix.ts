import { Component } from '@angular/core';

@Component({
  selector: 'app-painel-pix',
  templateUrl: './painel-pix.html',
  styleUrl: './painel-pix.css'
})
export class PainelPix {
  // Variáveis que controlam o que aparece na tela
  telaAtual: 'formulario' | 'alertaRisco' = 'formulario';
  
  // Dados recebidos da IA
  scoreRisco: number = 0;
  mensagemRisco: string = '';
  
  // Guarda os dados para disparar no final
  dadosOriginais: any;

  async avaliarPix(origem: string, destino: string, valor: string) {
    this.dadosOriginais = { contaOrigem: origem, contaDestino: destino, valor: parseFloat(valor) };

    try {
      const resposta = await fetch('http://localhost:8080/transacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.dadosOriginais)
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        
        // ⚠️ SIMULADOR TEMPORÁRIO: Como nosso Java/Python ainda não mandam a porcentagem,
        // vamos simular um risco alto aqui no Front-end só para testar a tela visual!
        this.scoreRisco = 85; 
        this.mensagemRisco = "Alerta: Transação incompatível com a renda e idade do perfil.";
        
        // Troca a tela do formulário para a tela de alerta!
        this.telaAtual = 'alertaRisco';
      } else {
        alert('❌ Erro de comunicação com o Cérebro Java.');
      }
    } catch (erro) {
      alert('💥 Falha total de rede. Verifique os servidores.');
    }
  }

  // Função chamada pelo botão final (após marcar o checkbox)
  confirmarTransferencia(checkboxMarcado: boolean) {
    if (checkboxMarcado) {
      alert('💸 TRANSFERÊNCIA EFETUADA! O banco registrou sua ciência do risco para fins de auditoria.');
      // Volta a tela para o início
      this.telaAtual = 'formulario';
    } else {
      alert('⚠️ Você precisa assumir o risco marcando a caixa de seleção antes de transferir.');
    }
  }

  cancelarTransferencia() {
    this.telaAtual = 'formulario'; // Apenas volta para a tela inicial
  }
}