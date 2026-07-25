import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  readonly theme = signal<ThemePreference>(this.getInitialTheme());
  readonly themeIcon = computed(() => {
    const icons: Record<ThemePreference, string> = {
      system: 'brightness_auto',
      light: 'light_mode',
      dark: 'dark_mode',
    };

    return icons[this.theme()];
  });

  setTheme(theme: ThemePreference): void {
    this.theme.set(theme);
    document.documentElement.dataset['theme'] = theme;
    localStorage.setItem('theme', theme);
  }

  private getInitialTheme(): ThemePreference {
    const savedTheme = localStorage.getItem('theme');

    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'system';
  }
}

type ThemePreference = 'light' | 'dark' | 'system';
