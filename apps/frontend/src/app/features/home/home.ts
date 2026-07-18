import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
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
export class Home implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly uploadedImages = signal<Image[]>([]);
  public readonly uploadFile = signal<File | null>(null);
  public readonly isUploading = signal(false);
  public readonly uploadError = signal<string | null>(null);

  public ngOnInit(): void {
    this.loadUploadedImages();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.uploadFile.set(file);
    this.uploadError.set(null);
  }

  public uploadSelectedImage(fileInput: HTMLInputElement): void {
    const file = this.uploadFile();

    if (!file || this.isUploading()) {
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set(null);

    this.homeService.uploadImage(file)
      .pipe(
        finalize(() => this.isUploading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (image) => {
          this.uploadedImages.update((images) => [image, ...images]);
          this.uploadFile.set(null);
          fileInput.value = '';
        },
        error: () => {
          this.uploadError.set('Upload failed. Please try again.');
        },
      });
  }

  private loadUploadedImages(): void {
    this.homeService.getUploadedImages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (images) => this.uploadedImages.set(images),
        error: () => {
          this.uploadError.set('Could not load uploaded images.');
        },
      });
  }
}
