export interface IRegisterUser {
    name:string;
    email:string;
    password:string;
}

export interface ILoginUser {
    email:string;
    password:string;
}

export interface IRegisterRes {
    success:boolean;
    token:string;
    user: IRegisterUser
}

export interface ILoginRes {
    success:boolean;
    token:string;
    user: string
}