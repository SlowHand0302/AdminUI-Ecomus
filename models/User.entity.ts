export type User = {
    [key: string]: string | null;
    id: string;
    email: string;
    password: string;
    phone: string | null;
    username: string;
    fullname: string;
    avatar: string;
};