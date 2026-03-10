"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
  const { data, error } = await supabase
    .from("listings")
    .select("*"); // Removed the .order line for now

  if (error) {
    console.error("Supabase Error:", error.message);
  } else if (data) {
    console.log("Data found:", data);
    setListings(data);
  }
  setLoading(false);
};

    fetchListings();
  }, []);

  if (loading) return <p className="p-10 text-center text-gray-500">Loading experiences...</p>;

  return (
    <main className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Explore Local Experiences</h1>
      
      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No experiences found. Be the first to post one!</p>
          <Link href="/create" className="text-blue-600 underline mt-2 inline-block">Post an experience</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item, index) => (
  <Link href={`/listings/${item.user_id}`} key={item.user_id || index} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" 
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-1 text-gray-900">{item.title}</h2>
                  <p className="text-gray-500 text-sm mb-3">{item.location}</p>
                  <p className="text-xs text-gray-400 mt-1">By: {item.user_id}</p>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">{item.description}</p>
                  <div className="mt-5 flex justify-between items-center border-t pt-4">
                    <span className="font-bold text-blue-600 text-lg">
                      {item.avg_price ? `$${item.avg_price}` : "Free"}
                    </span>
                    <span className="text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors">Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}