export enum Role {
  USER = "USER",
  WRITER = "WRITER",
  EDITOR = "EDITOR",
  ADMIN = "ADMIN",
}

export const RolePermissions = {
  admin: ["user.create", "user.delete"],
  user: ["post.read"],
};
