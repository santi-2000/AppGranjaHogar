import bcrypt from "bcryptjs";
import { UsersModel } from "../models/users.model.js";
import { Password } from "../valueObjects/users/Password.js";

export const createUserService = async ({ name, last_name, password }) => {
  const cleanName = String(name ?? "").trim();
  const cleanLast = String(last_name ?? "").trim();

  if (!cleanName || cleanName.length < 2) {
    const e = new Error("name mínimo 2 caracteres");
    e.code = "BAD_INPUT";
    throw e;
  }
  if (!cleanLast || cleanLast.length < 2) {
    const e = new Error("last_name mínimo 2 caracteres");
    e.code = "BAD_INPUT";
    throw e;
  }

  const passVO = new Password(password);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(passVO.value, salt);

  const created = await UsersModel.create({
    name: cleanName,
    last_name: cleanLast,
    passwordHash
  });

  return created;
};
