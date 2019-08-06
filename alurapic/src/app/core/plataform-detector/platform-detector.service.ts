import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root'})
export class PlatformDetectorService { 

    constructor(@Inject(PLATFORM_ID) private platformId: string) { }
    // é string mas pode ser um id
    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}