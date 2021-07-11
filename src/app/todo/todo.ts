import { User } from "./user";

export class Todo {
    id: number;
    title: string;
    completed: boolean;
    user: User;
}
