import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingComponent } from './loading/loading.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  exports: [
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoadingComponent,
  ],
})
export class AppSharedModule {}
