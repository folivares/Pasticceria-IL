import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * 
 * Servizio per la gestione centalizzata dello
 * stato del loader
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  loading: BehaviorSubject<boolean>;

  constructor() {
    this.loading = new BehaviorSubject(false);
  }

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }
}
