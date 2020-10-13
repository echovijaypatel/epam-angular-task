import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseItemDetailComponent } from './courses/course-item-detail/course-item-detail.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CoursesComponent } from './courses/courses.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    canActivate: [AuthGuardService],
    component: CoursesComponent,
    data: { breadcrumb: 'Courses' },
    children: [
      {
        path: '',
        component: CourseListComponent,
        data: { breadcrumb: 'List'},
      },
      {
        path: 'new',
        component: CourseItemDetailComponent,
        data: { breadcrumb: 'New Course'},
      },
      {
        path: 'edit/:id',
        component: CourseItemDetailComponent,
        data: { breadcrumb: 'Update Course'},
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
