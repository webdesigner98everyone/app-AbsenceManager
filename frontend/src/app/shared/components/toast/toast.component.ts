import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div *ngFor="let t of toasts; let i = index"
           class="toast" [ngClass]="t.type"
           (click)="remove(i)">
        <span class="toast-icon">
          {{ t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : '⚠️' }}
        </span>
        <span class="toast-msg">{{ t.message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed; top: 20px; right: 20px; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
    }
    .toast {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 20px; border-radius: 10px; color: #fff;
      font-size: 14px; font-weight: 500; cursor: pointer;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease;
      min-width: 280px; max-width: 420px;
    }
    .success { background: #2e7d32; }
    .error { background: #c62828; }
    .warning { background: #f57f17; }
    .toast-icon { font-size: 18px; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.toasts.shift(), 3500);
    });
  }

  remove(index: number): void {
    this.toasts.splice(index, 1);
  }
}
