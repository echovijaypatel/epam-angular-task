// import { Author } from '../app-courses/models/author';
// import { Course } from '../app-courses/models/course';
// import { CourseService } from './course.service';

// // Straight Jasmine testing without Angular's testing support
// describe('CourseService', () => {
//   let service: CourseService;
//   var allAuthors: Author[] = [
//     { id: 1, name: 'Johnny' },
//     { id: 2, name: 'Robert' },
//     { id: 3, name: 'Brad' },
//     { id: 4, name: 'Angelina' },
//     { id: 5, name: 'Scarlet' },
//   ];

//   beforeEach(() => {
//     service = new CourseService(null);
//   });

//   it('#getAllAuthors should return authors', () => {
//     service.getAllAuthors().subscribe(
//       (data) => {
//         expect(data).toBeDefined();
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   });

//   it('#getCourses should return courses', () => {
//     service.getCourses(0, 10, '', '').subscribe(
//       (data) => {
//         expect(data).toBeDefined();
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   });

//   it('#getCourse should return course if present', () => {
//     service.getCourse(1).subscribe(
//       (data) => {
//         expect(data.id).toBe(1);
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   });

//   it('#addCourse should add a new course', () => {
//     var testCourse: Course = {
//       id: 0,
//       name: 'Video Course 1. Name Tag',
//       length: 28,
//       isTopRated: false,
//       description:
//         "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
//       date: new Date(2020, 8, 22),
//       authors: allAuthors,
//     };
//     service.addCourse(testCourse).subscribe(
//       (data) => {
//         expect(data.id).toBeGreaterThan(0);
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   });

//   it('#updateCourse should update existing course', () => {
//     service.getCourse(1).subscribe(
//       (currentCourse) => {
//         currentCourse.name = 'New test title';
//         service.updateCourse(currentCourse).subscribe(
//           (updatedCourse) => {
//             expect(currentCourse.name).toBe(updatedCourse.name);
//           },
//           (err) => {
//             console.log(err);
//           }
//         );
//       },
//       (err) => {
//         expect(false).toBeTrue();
//         console.log(err);
//       }
//     );
//   });

//   it('#delete should delete existing course', () => {
//     service.deleteCourse(1).subscribe(
//       (data) => {
//         expect(data).toBeDefined();
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   });
// });
