import { Component } from '@angular/core';

import { Button } from '../../components/button/button';

@Component({
  selector: 'aiu-home',
  standalone: true,
  imports: [Button],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
