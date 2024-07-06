import { genSaltSync, hashSync, compare } from "bcrypt";
import { object, string } from "@hapi/joi";
import { sign, verify } from "jsonwebtoken";

// database schema
import User from "../model/User";

const AuthController = {
  // validation schema
  registerUser: async (req, res, next) => {
    const registrationSchema = object({
      name: string().required(),
      email: string().email().required(),
      password: string().required(),
    });

    try {
      // validating given data
      const { error } = registrationSchema.validate(req.body);
      if (error)
        return res.status(400).send("[validation error] Invalid data given.");

      // checking if already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) return res.status(400).send("User already exists");

      // create user
      const { name, email, password } = req.body;

      // hasing password
      const salt = genSaltSync();
      const hashedPass = hashSync(password, salt);

      const user = new User({
        name: name,
        email: email,
        password: hashedPass,
      });
      const savedUser = await user.save();
      // return res.status(200).send(savedUser);
      return savedUser;
    } catch (err) {
      return res.status(400).send("Invalid data given.");
    }
  },
  loginUser: async (req, res, next) => {
    const loginSchema = object({
      email: string().email().required(),
      password: string().required(),
    });

    try {
      // validating given data
      const { error } = loginSchema.validate(req.body);
      if (error)
        return res.status(400).send("[validation error] Invalid Credentials.");

      // checking if does not exist
      const user = (await User.findOne({ email: req.body.email })).toObject();
      if (!user) return res.status(400).send("User do not exist!");

      // checking if password is valid
      const validPass = await compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Invalid Credentials!");

      // create and assign a jwt token
      const token = sign({ _id: user._id }, process.env.JWT_SECRET);

      const { _id, name, email } = user;
      return res
        .header("auth-token", token)
        .status(200)
        .send({ _id, name, email });
    } catch (err) {
      return res.status(400).send("Invalid data given.");
    }
  },

  verifyToken: (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
      const verified = verify(token, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      return res.status(400).send("Invalid Token");
    }
  },
};

export default AuthController;
