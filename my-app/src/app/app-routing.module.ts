import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseItemDetailComponent } from './app-courses/course-item-detail/course-item-detail.component';
import { CourseListComponent } from './app-courses/course-list/course-list.component';
import { CoursesComponent } from './app-courses/courses.component';
import { LoginComponent } from './app-login/login/login.component';
import { PageNotFoundComponent } from './app-shared/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoadCoursesService } from './services/load-course.service';
import { LoadTokenService } from './services/load-token.service';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoadTokenService],
    component: LoginComponent,
    data: {
      isLogin: true,
    },
  },
  {
    path: 'courses',
    canActivate: [LoadTokenService, LoadCoursesService, AuthGuardService],
    component: CoursesComponent,
    data: {
      title: 'Courses',
      breadcrumb: [
        {
          label: 'Courses',
          url: '',
        },
      ],
    },
    children: [
      {
        path: 'new',
        component: CourseItemDetailComponent,
        data: {
          title: 'New',
          breadcrumb: [
            {
              label: 'Courses',
              url: '/courses',
            },
            {
              label: 'New',
              url: '',
            },
          ],
        },
      },
      {
        path: ':id',
        component: CourseItemDetailComponent,
        data: {
          title: 'Edit',
          breadcrumb: [
            {
              label: 'Courses',
              url: '/courses',
            },
            {
              label: 'Edit {{dynamicText}}',
              url: '',
            },
          ],
        },
      },
      {
        path: '',
        component: CourseListComponent,
      },
    ],
  },
  {
    path: '',
    canActivate: [LoadTokenService],
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      isLogin: true,
    },
  },
  {
    path: '**',
    canActivate: [LoadTokenService],
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
