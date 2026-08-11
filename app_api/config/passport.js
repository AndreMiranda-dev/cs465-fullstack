const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    console.log(">>> PASSPORT LOCAL STRATEGY TRIGGERED <<<");
    console.log("Email received:", email);
    console.log("Password received:", password);

    try {
      const user = await User.findOne({ email: email });
      console.log("PASSPORT: User lookup result:", user);

      if (!user) {
        console.log("PASSPORT: User not found");
        return done(null, false, { message: 'User not found' });
      }

      if (!user.validPassword(password)) {
        console.log("PASSPORT: Password invalid");
        return done(null, false, { message: 'Incorrect password' });
      }

      console.log("PASSPORT: Password valid");
      return done(null, user);

    } catch (err) {
      console.log("PASSPORT: Error during lookup:", err);
      return done(err);
    }
  }
));