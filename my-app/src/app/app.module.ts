import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ErrorComponent } from './error/error.component';
import { CourseItemComponent } from './course-list/course-item/course-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoComponent,
    CourseItemComponent,
    BreadcrumbsComponent,
    CourseListComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
