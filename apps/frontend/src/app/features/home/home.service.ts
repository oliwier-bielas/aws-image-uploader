import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { Image } from '../../core/interfaces/image.interface';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/api';

    public getUploadedImages(): Observable<Image[]> {
        return this.http.get<Image[]>(`${this.apiUrl}/images`);
    }
}