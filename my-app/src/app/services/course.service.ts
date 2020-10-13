import { Injectable } from '@angular/core';
import { Course } from '../courses/models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  courseItemsOverview: Course[];

  constructor() {
    this.courseItemsOverview = [
      {
        Id: 1,
        Title: 'Video Course 1. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 2,
        Title: 'Video Course 2. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 3,
        Title: 'Video Course 3. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 4,
        Title: 'Video Course 4. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 5,
        Title: 'Video Course 5. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 6,
        Title: 'Video Course 6. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
      {
        Id: 7,
        Title: 'Video Course 7. Name Tag',
        Duration: '1h 28 min',
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(),
      },
    ];
  }

  getCourses(): Course[] {
    return this.courseItemsOverview;
  }
  deleteCourse(index): Course[] {
    this.courseItemsOverview.splice(index, 1);
    return this.courseItemsOverview;
  }
}
