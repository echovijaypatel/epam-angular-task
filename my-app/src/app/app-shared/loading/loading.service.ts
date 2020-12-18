import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  loadingVisible: boolean = false;
  loadingSubject = new BehaviorSubject<boolean>(this.loadingVisible);

  showLoading(setLoading: boolean) {
    this.loadingVisible = setLoading;
    this.loadingSubject.next(setLoading);
  }
}
