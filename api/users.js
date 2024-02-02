import User from "./models/User.js";
import { getHash } from "./encryption.js";

export default function (server) {
  server.get("/api/users", async (req, res) => {
    const userlist = await User.find();
    res.status(200).json(userlist);
  });

  server.post("/api/users", async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      password: getHash(req.body.password),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: "Unable to create user." });
    }
  });

  server.post("/api/login", async (req, res) => {
    if (req.session.login) {
      res.json({ message: "User already logged in" });
    } else {
      const user = await User.findOne({
        username: req.body.username,
        password: getHash(req.body.password),
      });
      if (user) {
        req.session.login = user._id;
        res.json({
          message: `Login as ${user.username} successful`,
        });
      } else {
        res.json({ message: "User not found" });
      }
    }
  });

  server.delete("/api/login", async (req, res) => {
    if (req.session.login) {
      const user = await User.findById(req.session.login);
      delete req.session.login;
      res.json({ message: `Logged you out, ${user.username}` });
    } else {
      res.json({ message: "No one is logged in, you turnip" });
    }
  });
}
