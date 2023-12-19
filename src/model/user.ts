export interface User {
    key: number;
    userId: number;
    createdAt: string;
    active: boolean;
    role: number;
    updatedAt?: string,
    subscriptionId: number,
    gender: string,
    email: string,
    dateOfBirth: string,
    avatarURL: string,
    account: {username: string},
    accountId: number,
}


export interface UserAdd {
    email: string,
    dateOfBirth: string,
    gender: string,
    username: string,
    password?: string
}

export interface UserEdit{
    userId: number, 
    email: string,
    dateOfBirth: string,
    gender: string,
    username: string,
}


