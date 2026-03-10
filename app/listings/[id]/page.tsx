"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function ListingDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", id)
        .single();

      if (error) {
        console.error("Error fetching listing:", error.message);
      } else {
        setListing(data);
      }
      setLoading(false);
    };

    if (id) fetchListing();
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading details...</p>;
  if (!listing) return <p className="p-10 text-center">Experience not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <button 
        onClick={() => router.back()} 
        className="mb-6 text-blue-600 hover:underline flex items-center"
      >
        ← Back to Feed
      </button>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        <img 
          src={listing.image_url} 
          alt={listing.title} 
          className="w-full h-[400px] object-cover" 
        />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{listing.title}</h1>
              <p className="text-gray-500 text-lg mt-1">{listing.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-3xl font-bold text-blue-600">
                {listing.avg_price ? `$${listing.avg_price}` : "Free"}
              </p>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-6 my-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">About this experience</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {listing.user_id?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Experience Host</p>
                <p className="text-xs text-gray-500">Member since 2026</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}