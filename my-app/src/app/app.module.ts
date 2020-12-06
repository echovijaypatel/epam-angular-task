import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NumberToMinutes } from './services/numbertominutes.pipe';
import { AppSharedModule } from './app-shared/app-shared.module';
import { AppLoginModule } from './app-login/app-login.module';
import { CourseListComponent } from './app-courses/course-list/course-list.component';
import { CoursesComponent } from './app-courses/courses.component';
import { CourseItemDetailComponent } from './app-courses/course-item-detail/course-item-detail.component';
import { CourseListHighlightDirective } from './app-courses/course-list/course-list.directive';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { AuthInterceptor } from './services/auth-interceptor';
import { LoadingInterceptor } from './app-shared/loading/loading.interceptor';

import { StoreModule } from '@ngrx/store';
import { courseReducer } from './state/course.reducer';
import { authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { LoadTokenService } from './services/load-token.service';

@NgModule({
  declarations: [
    AppComponent,
    NumberToMinutes,
    CourseListComponent,
    CoursesComponent,
    CourseItemDetailComponent,
    CourseListHighlightDirective,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    AppLoginModule,
    AppSharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgDynamicBreadcrumbModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot({
      courses: courseReducer,
      authState: authReducer,
    }),
  ],
  providers: [
    NumberToMinutes,
    LoadTokenService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
