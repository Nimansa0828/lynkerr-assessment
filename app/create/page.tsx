"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setIsError(true);
      setMessage("Please login first to post an experience.");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    const { error } = await supabase.from("listings").insert([
      {
        title,
        location,
        description,
        avg_price: price, 
        image_url: imageUrl, 
        user_id: user.id,
      },
    ]);

    if (error) {
      setIsError(true);
      setMessage("Error: " + error.message);
    } else {
      setIsError(false);
      setMessage("Success! Your experience has been published.");
      // Redirect after a short delay so they can see the success message
      setTimeout(() => router.push("/"), 1500);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Post a New Experience</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
        
        {/* Experience Title */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Experience Title</label>
          <input 
            type="text" 
            placeholder="e.g. Sunset Boat Tour" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Location</label>
          <input 
            type="text" 
            placeholder="e.g. Sigiriya, Sri Lanka" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Image URL</label>
          <input 
            type="text" 
            placeholder="Paste a link from Unsplash or Google Images" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            required 
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Description</label>
          <textarea 
            placeholder="Describe the kingdom, the hike, or the boat tour..." 
            className="w-full p-3 border border-gray-300 rounded-lg h-32 text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-bold text-gray-800 mb-1">Price (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. $45" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>

        {/* Feedback Message */}
        {message && (
          <div className={`p-4 rounded-lg border text-sm font-medium ${
            isError ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"
          }`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-300"
        >
          {loading ? "Publishing..." : "Publish Experience"}
        </button>
      </form>
    </div>
  );
}