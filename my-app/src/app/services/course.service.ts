import { Injectable } from '@angular/core';
import { Author } from '../app-courses/models/author';
import { Course } from '../app-courses/models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courseItemsOverview: Course[];
  private allAuthors: Author[];
  private selectedAuthors: Author[];

  constructor() {
    this.allAuthors = [
      { id: 1, name: 'Johnny' },
      { id: 2, name: 'Robert' },
      { id: 3, name: 'Brad' },
      { id: 4, name: 'Angelina' },
      { id: 5, name: 'Scarlet' },
    ];
    this.selectedAuthors = [{ id: 3, name: 'Brad' }];

    this.courseItemsOverview = [
      {
        Id: 1,
        Title: 'Video Course 1. Name Tag',
        Duration: 90,
        IsTopRated: true,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 10, 22),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 2,
        Title: 'Video Course 2. Name Tag',
        Duration: 28,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 9, 29),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 3,
        Title: 'Video Course 3. Name Tag',
        Duration: 70,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 9, 28),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 4,
        Title: 'Video Course 4. Name Tag',
        Duration: 28,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 8, 22),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 5,
        Title: 'Video Course 5. Name Tag',
        Duration: 28,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 8, 1),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 6,
        Title: 'Video Course 6. Name Tag',
        Duration: 28,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 8, 2),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
      {
        Id: 7,
        Title: 'Video Course 7. Name Tag',
        Duration: 28,
        IsTopRated: false,
        Description:
          "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        CreationDate: new Date(2020, 8, 5),
        Authors: this.allAuthors,
        SelectedAuthors: this.selectedAuthors,
      },
    ];
  }

  getAllAuthors(): Author[] {
    return this.allAuthors;
  }

  getCourses(): Course[] {
    return this.courseItemsOverview;
  }

  getCourse(id): Course {
    for (var i in this.courseItemsOverview) {
      if (this.courseItemsOverview[i].Id == id) {
        return this.courseItemsOverview[i];
      }
    }
    return null;
  }

  addCourse(course: Course): Course[] {
    course.Id = this.getNextId();
    this.courseItemsOverview.push(course);
    return this.courseItemsOverview.slice(0);
  }

  updateCourse(course: Course): Course[] {
    for (var i in this.courseItemsOverview) {
      if (this.courseItemsOverview[i].Id == course.Id) {
        this.courseItemsOverview[i] = course;
        break; //Stop this loop, we found it!
      }
    }
    return this.courseItemsOverview.slice(0);
  }

  deleteCourse(id): Course[] {
    debugger;
    this.courseItemsOverview = this.courseItemsOverview.filter(
      (item) => item.Id !== id
    );
    return this.courseItemsOverview.slice(0);
  }

  private getNextId(): number {
    return (
      Math.max.apply(
        Math,
        this.courseItemsOverview.map(function (o) {
          return o.Id;
        })
      ) + 1
    );
  }
}
