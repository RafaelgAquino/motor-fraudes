import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 👈 Adicionamos o RouterLink aqui!

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink], // 👈 E aqui também!
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-motor-fraudes');
}