export type RegisterBody = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type UserProfileData = {
    id: string;
    email: string;
    created_at: string;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    status: string;
    role: string;
    avatar_url?: string;
};