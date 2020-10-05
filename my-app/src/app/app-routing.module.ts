import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CourseListComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
