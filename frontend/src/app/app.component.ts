import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarOpen = window.innerWidth > 768;
  isMobile = window.innerWidth <= 768;

  navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/calendar', label: 'Calendario', icon: '📅' },
    { path: '/absences', label: 'Ausencias', icon: '📋' },
    { path: '/history', label: 'Historial', icon: '📜' },
    { path: '/employees', label: 'Empleados', icon: '👥' }
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarOpen = true;
    }
  }

  onNavClick(): void {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }
}
