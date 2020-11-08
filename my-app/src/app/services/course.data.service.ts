import { Author } from '../app-courses/models/author';

export class CourseDataService {
  constructor() {}

  getAllAuthors(): Author[] {
    return [
      { id: 1, name: 'Johnny' },
      { id: 2, name: 'Robert' },
      { id: 3, name: 'Brad' },
      { id: 4, name: 'Angelina' },
      { id: 5, name: 'Scarlet' },
    ];
  }
}
