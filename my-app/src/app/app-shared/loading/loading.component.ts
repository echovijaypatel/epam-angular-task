import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoadingVisible = false;
  subscription = new Subscription();

  constructor(private loadingService: LoadingService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.loadingService.loadingSubject.subscribe((data) => {
      this.isLoadingVisible = data;
    });
  }
}
