import { Name } from './name';

export interface User {
    id: number;
    token: string,
    name: Name;
    login: string;
    password: string;
}
