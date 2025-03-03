import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-dark-theme');
    const btn = document.querySelector('.color-switcher');

    if (element?.classList.contains('my-dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    if (btn?.classList.contains('pi-moon')) {
      btn?.classList.remove('pi-moon');
      btn?.classList.add('pi-sun');
    } else {
      btn?.classList.remove('pi-sun');
      btn?.classList.add('pi-moon');
    }
  }

  ngOnInit() {
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      const element = document.querySelector('html');
      element?.classList.add('my-dark-theme');
      const btn = document.querySelector('.color-switcher');
      btn?.classList.remove('pi-moon');
      btn?.classList.add('pi-sun');
    }
  }
}
