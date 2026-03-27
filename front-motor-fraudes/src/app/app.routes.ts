import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { PainelPix } from './painel-pix/painel-pix';
import { Login } from './login/login'; // 👈 Importamos a nova sala

export const routes: Routes = [
  // A rota vazia agora joga o usuário para o Login!
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'login', component: Login },
  { path: 'pix', component: PainelPix },
  { path: 'cadastro', component: Cadastro }
];