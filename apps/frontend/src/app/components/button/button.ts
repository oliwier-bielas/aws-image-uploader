import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonVariantEnum, ButtonVariantType } from './button.models';

@Component({
  selector: 'aiu-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public label = input.required<string>();
  public variant = input<ButtonVariantType>(ButtonVariantEnum.FILLED);
  public disabled = input(false);
}
