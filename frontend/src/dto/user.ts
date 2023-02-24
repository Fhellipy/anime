export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	confirm_password?: string;
}

export interface UserLogged {
	token: string;
	user: {
		id: string;
		username: string;
		email: string;
	};
}
