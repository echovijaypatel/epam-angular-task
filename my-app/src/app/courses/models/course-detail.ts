import { Course } from './course';
import { User } from './user';

export class CourseDetail {
  course: Course;
  authors: User[];

  constructor(course: Course, authors: User[]) {
    this.course = course;
    this.authors = authors;
  }
}
