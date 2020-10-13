import { User } from './user';

export interface Course {
  Id: number;
  Title: string;
  CreationDate: Date;
  Duration: string;
  Description: string;
  Authors: User[];
  SelectedAuthors: User[];
}
