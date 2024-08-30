import config from "../config/config";
import toast from "react-hot-toast";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  // signup function
  async signup({
    fullName,
    username,
    email,
    gender,
    password,
    confirmPassword,
  }) {
    // check if all fields are filled
    if (
      !this.inputError({ fullName, username, email, password, confirmPassword })
    ) {
      return;
    }

    try {
      // request to the server for signup
      const res = await fetch(config.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          gender,
          password,
          confirmPassword,
        }),
      });
      
      // get response from the server
      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Signup successful.");
      return data;
    } catch (err) {
     // catch error and display it
      console.log(err);
      toast.error(err.message);
    }
  }

  // login function
  async login({ username, password }) {
    // check if username and password are filled
    if (!username || !password) {
      toast.error("Username and password are required.");
      return;
    }

    // request to the server for login
    try {
      const res = await fetch(config.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Login successful.");
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  // logout function
  async logout() {
    try {
      // request to the server for logout
      const res = await fetch(config.logout, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success("Logout successful.");
      return data;
    } catch (err) {
      // catch error and display it
      console.log(err);
      toast.error(err.message);
    }
  }

  // check if all fields are filled
  inputError({ fullName, username, email, password, confirmPassword }) {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password do not match.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    } else {
      return true;
    }
  }
}

// export auth object
const auth = new Auth();

export default auth;
