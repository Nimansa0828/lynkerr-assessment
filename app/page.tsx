"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search

  useEffect(() => {
    const fetchListings = async () => {
      // We fetch all data; we'll handle the sorting and filtering in the frontend
      const { data, error } = await supabase
        .from("listings")
        .select("*");

      if (error) {
        console.error("Supabase Error:", error.message);
      } else if (data) {
        // Safe sorting: newest first if created_at exists
        const sortedData = data.sort((a, b) => {
          if (a.created_at && b.created_at) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return 0;
        });
        setListings(sortedData);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  // Filter listings based on what the user types in the search bar
  const filteredListings = listings.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="p-10 text-center text-gray-500">Loading experiences...</p>;

  return (
    <main className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      {/* Header with Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Local <span className="text-blue-600">Experiences</span>
        </h1>

        <div className="relative w-full md:w-80">
          <span className="absolute left-4 top-3 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search destination or activity..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">
            {searchQuery ? `No results for "${searchQuery}"` : "No experiences found yet."}
          </p>
          <Link href="/create" className="text-blue-600 font-bold hover:underline mt-4 inline-block">
            {searchQuery ? "Clear search" : "Post the first experience"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((item) => (
            <Link href={`/listings/${item.id}`} key={item.id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    {item.location?.split(',')[0]}
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Price</p>
                      <span className="font-bold text-gray-900 text-lg">
                        {item.avg_price ? `$${item.avg_price}` : "Free"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                      Details →
                    </span>
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