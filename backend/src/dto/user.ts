export interface User {
	id?: string;
	username?: string;
	email: string;
	password: string;
}

export interface Password {
	current_password: string;
	password: string;
}
