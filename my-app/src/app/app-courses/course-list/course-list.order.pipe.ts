import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course';

@Pipe({
  name: 'CourseListOrder',
})
export class CourseListOrder implements PipeTransform {
  transform(courseItems: Course[]): Course[] {
    courseItems.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return courseItems;
  }
}
