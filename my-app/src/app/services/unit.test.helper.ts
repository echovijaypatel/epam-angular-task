import { CourseItemDetailComponent } from '../app-courses/course-item-detail/course-item-detail.component';
import { CourseListComponent } from '../app-courses/course-list/course-list.component';
import { CoursesComponent } from '../app-courses/courses.component';
import { LoginComponent } from '../app-login/login/login.component';
import { PageNotFoundComponent } from '../app-shared/page-not-found/page-not-found.component';

export abstract class UnitTestHelper {
  public static testRouteValue = '1';

  public static injectTestingRoute() {
    return [
      { path: 'login', component: LoginComponent },
      {
        path: 'courses',
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
      { path: '', component: LoginComponent },
      { path: '**', component: PageNotFoundComponent },
    ];
  }
}
