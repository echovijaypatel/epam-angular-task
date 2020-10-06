import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: CourseListComponent,
      },
      {
        path: 'new',
        component: CourseListItemComponent,
      },
      {
        path: 'edit/:id',
        component: CourseListItemComponent,
      },
    ],
  },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
