import { Component } from '@angular/core';

@Component({
  selector: 'app-reclamo-modal',
  templateUrl: './reclamo-modal.component.html',
  styleUrls: ['./reclamo-modal.component.css']
})
export class ReclamoModalComponent {


  constructor() { }

  public openModal(): void {
    const modal = document.getElementById('myModal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: block;');
  }

  public closeModal(): void {
    const modal = document.getElementById('myModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none;');
    
  }
}
