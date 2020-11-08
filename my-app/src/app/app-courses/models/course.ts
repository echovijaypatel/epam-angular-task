import { Author } from './author';

export interface Course {
  Id: number;
  Title: string;
  CreationDate: Date;
  Duration: number;
  IsTopRated: boolean;
  Description: string;
  Authors: Author[];
  SelectedAuthors: Author[];
}
