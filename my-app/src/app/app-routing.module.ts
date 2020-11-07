import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseItemDetailComponent } from './app-courses/course-item-detail/course-item-detail.component';
import { CourseListComponent } from './app-courses/course-list/course-list.component';
import { CoursesComponent } from './app-courses/courses.component';
import { LoginComponent } from './app-login/login/login.component';
import { PageNotFoundComponent } from './app-shared/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    canActivate: [AuthGuardService],
    component: CoursesComponent,
    children: [
      {
        path: 'new',
        component: CourseItemDetailComponent,
      },
      {
        path: ':id',
        component: CourseItemDetailComponent,
      },
      {
        path: '',
        component: CourseListComponent,
      },
    ],
  },
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
