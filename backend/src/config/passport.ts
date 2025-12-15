import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

passport.use(
  new LocalStrategy({ usernameField: "username", passwordField: "password" }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).select("+password");

      const message = "Wrong credentials";
      if (!user) {
        return done(null, false, { message });
      }

      const passwordMatch = await bcrypt.compare(password, user.password!);

      if (!passwordMatch) {
        return done(null, false, { message });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

export default passport;
