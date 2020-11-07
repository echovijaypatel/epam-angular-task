import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, NgxBootstrapIconsModule.pick(allIcons)],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
})
export class AppSharedModule {}
