import React from "react";

const Login = ({ setIsLoggedIn }) => {
  console.log(setIsLoggedIn);
  const [showSignIn, setShowSignIn] = React.useState(true);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleShowSignIn = (e) => {
    e.preventDefault();
    setShowSignIn(true);
  };

  const handleShowSignUp = (e) => {
    e.preventDefault();
    setShowSignIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://expense-tracker-z3wf.onrender.com/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (user) =>
            user.username === formData.username &&
            user.password === formData.password
        );
        if (user) {
          setIsLoggedIn(true);
          setErrorMessage("");
          setFormData({
            username: "",
            password: "",
          });
        } else {
          alert("Invalid username or password, please try again");
          setErrorMessage("Invalid username or password, please try again");
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
        setErrorMessage("An error occured please try again");
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setErrorMessage("Passwords do not match");
      return;
    }

    const newUser = {
      username: formData.username,
      password: formData.password,
    };

    fetch("https://expense-tracker-z3wf.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        return response.json();
      })
      .then(() => {
        alert("Account created successfully, please log in");
        setErrorMessage("");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        setErrorMessage("An error occurred. Please try again");
      });
  };
  return (
    <div className="login-container">
      <div className="app-info">
        <main>
          <h1 className="heading-big">Welcome to Your Expense Tracker App!</h1>
          <p>
            Track, manage, and organize your expenses effortlessly. This app
            helps you take control of your finances by giving you clear insights
            into your spending patterns and empowering you to make informed
            financial decisions. Start by logging in or creating an account to
            begin your journey to smarter spending!
          </p>
        </main>
        <footer>
          <a href="https://x.com/RovenelAbanga" target="_blank">
            Rovenel Abanga
          </a>
        </footer>
      </div>
      <div className="forms-container">
        {/* Sign In Form - use inline style to control visibility */}
        <div
          className="signin-form-container"
          style={{ display: showSignIn ? "block" : "none" }}
        >
          <form
            className="user-forms sign-in-form"
            onSubmit={handleLogin}
            autoComplete="off"
          >
            <h1 className="heading-big">Sign In</h1>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn sign-up-btns">
              Sign In
            </button>
          </form>
          <p>
            Don't have an account?
            <span>
              <button onClick={handleShowSignUp} className="form-btn">
                Sign up
              </button>
            </span>
          </p>
        </div>

        {/* Sign Up Form - use inline style to control visibility */}
        <div
          className="signup-form-container"
          style={{ display: showSignIn ? "none" : "block" }}
        >
          <form
            className="user-forms sign-up-form"
            onSubmit={handleSignUp}
            autoComplete="off"
          >
            <h1 className="heading-big">Sign Up</h1>
            <input
              placeholder="Create username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              placeholder="Create password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="btn sign-up-btns">
              Sign Up
            </button>
          </form>
          <p className="">
            Already have an account?
            <span>
              <button onClick={handleShowSignIn} className="form-btn">
                Sign In
              </button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
