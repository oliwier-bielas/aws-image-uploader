import { Component, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from '../../components/button/button';
import { ImageGrid } from '../../components/image-grid/image-grid';
import type { Image } from '../../core/interfaces/image.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'aiu-home',
  standalone: true,
  imports: [Button, ImageGrid],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly homeService = inject(HomeService);

  public readonly uploadedImages = toSignal<Image[]>(this.homeService.getUploadedImages());

}
