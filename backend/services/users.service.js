import bcrypt from "bcryptjs";
import { UsersModel } from "../models/users.model.js";
import { Password } from "../valueObjects/users/Password.js";

export const createUserService = async ({ name, last_name, username, password }) => {
  const cleanName = String(name ?? "").trim();
  const cleanLast = String(last_name ?? "").trim();
  const cleanUser = String(username ?? "").trim();

  if (!cleanName || cleanName.length < 2) throw Object.assign(new Error("name mínimo 2 caracteres"), { code: "BAD_INPUT" });
  if (!cleanLast || cleanLast.length < 2) throw Object.assign(new Error("last_name mínimo 2 caracteres"), { code: "BAD_INPUT" });
  if (!cleanUser || cleanUser.length < 3) throw Object.assign(new Error("username mínimo 3 caracteres"), { code: "BAD_INPUT" });

  const passVO = new Password(password);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(passVO.value, salt);

  const created = await UsersModel.create({
    name: cleanName,
    last_name: cleanLast,
    username: cleanUser,
    passwordHash
  });

  return created; 
};
