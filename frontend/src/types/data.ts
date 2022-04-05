export type Word = {
    id?: number;
    type_id?: number;
    user_id?: number;
    word: string;
    translation: string;
    priority: number;
}

export type User = {
    name?: string;
    username: string;
    password: string;
}

export const QueryOptions = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
}