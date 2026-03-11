"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function ListingDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); 
  useEffect(() => {
    const fetchListingAndUser = async () => {
      
      const { data: listingData, error: fetchError } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching listing:", fetchError.message);
        setLoading(false);
        return;
      }

      setListing(listingData);

     
      const { data: { user } } = await supabase.auth.getUser();
      if (user && listingData && user.id === listingData.user_id) {
        setIsOwner(true);
      }
      
      setLoading(false);
    };

    if (id) fetchListingAndUser();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this experience? This action cannot be undone.");
    
    if (confirmDelete) {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);

      if (error) {
        alert("Error deleting listing: " + error.message);
      } else {
        alert("Listing deleted successfully.");
        router.push("/"); 
      }
    }
  };

  if (loading) return <p className="p-10 text-center">Loading details...</p>;
  if (!listing) return <p className="p-10 text-center">Experience not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => router.back()} 
          className="text-blue-600 hover:underline flex items-center font-medium"
        >
          ← Back to Feed
        </button>

        {}
        {isOwner && (
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm font-bold border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            🗑️ Delete My Listing
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        <img 
          src={listing.image_url} 
          alt={listing.title} 
          className="w-full h-[450px] object-cover" 
        />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">{listing.title}</h1>
              <p className="text-gray-500 text-lg mt-1 flex items-center">
                <span className="mr-1">📍</span> {listing.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Price</p>
              <p className="text-3xl font-black text-blue-600">
                {listing.avg_price ? `$${listing.avg_price}` : "Free"}
              </p>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-8 my-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">About this experience</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">
              {listing.description}
            </p>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-md">
                {listing.user_id?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Local Guide</p>
                <p className="text-xs text-gray-500 font-medium">Verified Experience Host</p>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform hover:scale-105 active:scale-95">
              Book Experience
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}