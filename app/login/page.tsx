"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      router.push("/"); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="e.g. name@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-500 bg-white"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
             
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-500 bg-white"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              
              readOnly
              onFocus={(e) => e.target.removeAttribute('readOnly')}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-500 bg-red-50 p-2 rounded border border-red-100">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}