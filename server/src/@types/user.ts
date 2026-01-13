import { Role } from "../enums/role";

interface User {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

export default User;
