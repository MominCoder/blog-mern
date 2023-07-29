import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "No user found" });

    const isCorrectPassword = bcrypt.compare(password, existingUser.password);

    if (!isCorrectPassword)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ name: existingUser.name, id: existingUser._id, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ name: result.name, id: result._id, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
