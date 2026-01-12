import { Role } from "../utils/role";

interface User {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

export default User;
