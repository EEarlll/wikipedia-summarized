import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    IconField,
    InputIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Cortex';
  private random_word_file = "assets/words_dictionary.json";

  constructor(private router: Router) {}

  async search(event?: any, eventValue?: string, lucky?: boolean) {
    event?.preventDefault();
    let randomWord;
    if (lucky) {
      const response = await fetch(this.random_word_file);
      const words = await response.json();
      const keys = Object.keys(words);
      let randomIndex = Math.floor(Math.random() * keys.length);
      randomWord = keys[randomIndex]; 
    }
    const parameter = event.target.value ? event.target.value : eventValue;
    this.router.navigate(['/search'], {
      queryParams: { q: lucky ? randomWord : parameter },
    });
  }
}
