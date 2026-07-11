import { Component, input } from '@angular/core';

import type { Image } from '../../core/interfaces/image.interface';

@Component({
    selector: 'aiu-image-grid',
    standalone: true,
    templateUrl: './image-grid.html',
    styleUrl: './image-grid.scss',
})
export class ImageGrid {
    public images = input.required<Image[]>();
}
