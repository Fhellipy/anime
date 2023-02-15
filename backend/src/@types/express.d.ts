import { User } from "@dto/user";

declare global {
	namespace Express {
		export interface Request {
			user: Partial<User>;
		}
	}
}
