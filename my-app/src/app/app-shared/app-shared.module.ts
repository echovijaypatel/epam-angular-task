import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [LogoComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [LogoComponent, HeaderComponent, FooterComponent],
})
export class AppSharedModule {}
