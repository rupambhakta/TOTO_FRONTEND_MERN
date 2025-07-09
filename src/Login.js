import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (userName, password) => {
    setAuthLoading(true);
    setAuthError("");

    const responce = await fetch("https://todobackendmern.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json.stringify({ userName, password }),
    });

    const data = await responce.json();
    setAuthLoading(false);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setAuthError(data.message || "Login Failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-orange-50 rounded-lg border-oragne-200 ">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-600 ">
        Login
      </h2>
      {authError && (
        <div className="mb-3 text-center text-red-600 font-semibold">
          {authError}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(userName, password);
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

        <button
          type="submit"
          className="px-4 py-4 bg-orange-500 hover:bg-oragne-600 text-black rounded w-full transition-color-gray"
        >
          {authLoading ? "Loggin in...." : "Login"}
        </button>
      </form>
      <div className="mt-5 text-center text-gray-700">
        Don't have an account?
        <Link to="/signup">
          <span className="text-orange-500 hover:underline font-semibold cursor-pointer">
            Signup
          </span>
        </Link>
      </div>
    </div>
  );
}
