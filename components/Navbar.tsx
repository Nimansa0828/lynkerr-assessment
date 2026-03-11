"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Lynkerr
      </Link>

      <div className="flex items-center space-x-8">
        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Explore</Link>
        <Link href="/create" className="text-gray-600 hover:text-blue-600 font-medium">+ Post Experience</Link>

        {user ? (
          <div className="flex items-center space-x-4">
            {}
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}