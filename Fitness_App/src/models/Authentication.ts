/** @format */

export interface newUser {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	celNum: string;
	adress: string;
	password: string;
	password2?: string;
	role?: string;
}

export interface OtherProps {
	title?: string;
}

export interface newUserFormProps {
	initialFirstName?: string;
	initialLastName?: string;
	initialUsername?: string;
	initialEmail?: string;
	initialcelNum?: string;
	initialAdress?: string;
	initialPassword?: string;
	initialPassword2?: string;
}

export interface LoginUser {
	email: string;
	password: string;
	role?: string;
}

export interface LogedInUser {
	role?: string;
	username: string;
	imageUrl: any;
}

export interface LoginUserFormProps {
	initialemail?: string;
	initialPassword?: string;
}

export interface iUser {
	firstName: string;
	lastName: string;
	email: string;
	celNum: number;
	adress: string;
	username: string;
	password: string;
	role: string;
}
