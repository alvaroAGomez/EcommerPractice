export interface User{
    id:string,
    email:String,
    password:string,
    name:string
}

export interface UserDto extends Omit<User,'id'>{}