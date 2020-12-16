import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

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

import { courseReducer } from './app-courses/state/course.reducer';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { LoadTokenService } from './services/load-token.service';
import { LoadCoursesService } from './services/load-course.service';
import { CourseEffects } from './app-courses/state/course.effect';
import { DatePickerComponent } from './app-courses/custom-controls/date-picker/date-picker.component';
import { AuthorPickerComponent } from './app-courses/custom-controls/author-picker/author-picker.component';
import { CourseDurationComponent } from './app-courses/custom-controls/course-duration/course-duration.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NumberToMinutes,
    CourseListComponent,
    CoursesComponent,
    CourseItemDetailComponent,
    CourseListHighlightDirective,
    DatePickerComponent,
    CourseDurationComponent,
    AuthorPickerComponent,
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
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([AuthEffects, CourseEffects]),
    StoreModule.forRoot({
      courses: courseReducer,
      authState: authReducer,
    }),
  ],
  providers: [
    NumberToMinutes,
    LoadTokenService,
    LoadCoursesService,
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
