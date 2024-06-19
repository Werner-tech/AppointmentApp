import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner" [ngStyle]="{'width.px': size, 'height.px': size, 'border-width.px': borderWidth}"></div>`,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() size = 50;
  @Input() borderWidth = 5;
}
