import { Component, signal } from '@angular/core';
import { RxjsCreation } from './rxjs-creation/rxjs-creation';

@Component({
  selector: 'app-root',
  imports: [ RxjsCreation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RXJS-obs');
}
