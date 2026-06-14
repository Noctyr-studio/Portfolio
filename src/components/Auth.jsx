
import { useState } from "react";

export default function Auth({ mode = "login", onClose , setUser}) {
  const [isLogin, setIsLogin] = useState(mode === "login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    const endpoint = isLogin
      ? `${API_URL}/login`
      : `${API_URL}/register`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (data.success) {
        alert(
          isLogin
            ? "Login successful"
            : "Account created"
        );

        if (data.token) {
        localStorage.setItem("token", data.token);

        const meRes = await fetch(
          `${API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        const userData = await meRes.json();

        setUser(userData);
      }

        onClose();
      } else {
        alert(data.error || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/90
        backdrop-blur-sm
        overflow-y-auto
        p-6
      "
      onClick={onClose}
    >

{/* Glow Effects */}


  <div
    className="
    absolute
    right-0
    top-1/4
    w-[500px]
    h-[500px]
    rounded-full
    bg-green-500/10
    blur-3xl
  "
  />

  <div
    className="
    absolute
    bottom-0
    left-1/2
    -translate-x-1/2
    w-[600px]
    h-[600px]
    rounded-full
    bg-orange-500/10
    blur-3xl
  "
  />

  <div
    className="
    absolute
    top-0
    left-0
    w-[400px]
    h-[400px]
    rounded-full
    bg-violet-500/10
    blur-3xl
  "
  />

  {/* Card */}

 <div
  className="
    relative
    z-10
    w-full
    max-w-md
    rounded-3xl
    border
    border-white/10
    bg-neutral-950/80
    backdrop-blur-xl
    p-8
  "
  onClick={(e) => e.stopPropagation()}
>
  <button
    onClick={onClose}
    className="
      absolute
      top-4
      right-4
      text-zinc-400
      hover:text-white
      transition
      text-xl
    "
  >
    ✕
  </button>

    {/* Tabs */}

    <div className="flex mb-8 rounded-xl overflow-hidden border border-white/10">
      <button
        onClick={() => setIsLogin(true)}
        className={`
          flex-1
          py-3
          transition
          ${
            isLogin
              ? "bg-violet-600 text-white"
              : "bg-transparent text-zinc-400"
          }
        `}
      >
        Login
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className={`
          flex-1
          py-3
          transition
          ${
            !isLogin
              ? "bg-violet-600 text-white"
              : "bg-transparent text-zinc-400"
          }
        `}
      >
        Register
      </button>
    </div>

    <h1 className="text-4xl font-bold text-center mb-8">
      {isLogin ? "Welcome Back" : "Create Account"}
    </h1>

    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-zinc-400">
          Email
        </label>

        <input
          type="email"
          value={email}
          placeholder="your@email.com"
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-3
            outline-none
            focus:border-violet-500
          "
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 text-zinc-400">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-3
            outline-none
            focus:border-violet-500
          "
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {!isLogin && (
        <div>
          <label className="block mb-2 text-zinc-400">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              px-4
              py-3
              outline-none
              focus:border-violet-500
            "
          />
        </div>
      )}

      {/* CAPTCHA placeholder */}

      <div
        className="
          h-24
          rounded-xl
          border
          border-white/10
          bg-white/[0.03]
          flex
          items-center
          justify-center
          text-zinc-500
        "
      >
        CAPTCHA
      </div>

      <button
        type="submit"
        className="
          w-full
          rounded-xl
          bg-violet-600
          py-3
          font-semibold
          transition
          hover:bg-violet-500
        "
      >
        {isLogin ? "Login" : "Create Account"}
      </button>
    </form>
  </div>
</div>


);
}
