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

  constructor(private router: Router) {}

  async search(event?: any, eventValue?: string, lucky?: boolean) {
    event?.preventDefault();
    let randomWord;
    if (lucky) {
      randomWord = await fetch(
        'https://random-word-api.herokuapp.com/word?number=1'
      );
      randomWord = (await randomWord.json())[0];
    }
    const parameter = event.target.value ? event.target.value : eventValue;
    this.router.navigate(['/search'], {
      queryParams: { q: lucky ? randomWord : parameter },
    });
  }
}
