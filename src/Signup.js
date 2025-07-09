import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (userName, password) => {
    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);

    const response = await fetch(
      "https://todobackendmern.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json.stringify({ userName, password }),
      }
    );

    const data = await response.json();
    setAuthLoading(false);
    if (data.message === "User registered") {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setAuthError(data.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-orange-50 rounded-lg border-oragne-200 ">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-600 ">
        Sign up
      </h2>
      {authError && (
        <div className="mb-3 text-center text-red-600 font-semibold">
          {authError}
        </div>
      )}
      {success && (
        <div className="mb-3 text-center text-green-600 font-semibold">
          Registration successful! Redirecting to login...
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(password!=confPassword){
            setAuthError("Passwords do not match");
            return;
          }
          signup(userName, password);
        }}
      >
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-3 border-2 border-orange-300 rounded w-full mb-4 focus:outline-focus focus:ring-2 focus:ring-oragne-400"
          placeholder="User Name"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 border-orange-300 rounded w-full mb-4 focus:outline-focus focus:ring-2 focus:ring-oragne-400"
          placeholder="Password"
        />
        <input
          type="password"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          className="p-3 border-2 border-orange-300 rounded w-full mb-4 focus:outline-focus focus:ring-2 focus:ring-oragne-400"
          placeholder="Conferm Password"
        />

        <button
          type="submit"
          className="px-4 py-4 bg-orange-500 hover:bg-oragne-600 text-black rounded w-full transition-colors duration-200"
          disabled={authLoading}
        >
          {authLoading ? "Sign up...." : "Signup"}
        </button>
      </form>
      <div className="mt-5 text-center text-gray-700">
        Already have an account?
        <Link to="/login">
          <span className="text-orange-500 hover:underline font-semibold cursor-pointer">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
