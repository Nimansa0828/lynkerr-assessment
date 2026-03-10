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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first!");
      router.push("/login");
      return;
    }

    // UPDATED: Using your specific column names (avg_price and image_url)
    const { error } = await supabase.from("listings").insert([
      {
        title,
        location,
        description,
        avg_price: price, // Matches your DB
        image_url: imageUrl, // Matches your DB
        user_id: user.id,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Listing created successfully!");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Post a New Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-xl border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Title</label>
          <input type="text" placeholder="e.g. Sunset Boat Tour" className="w-full p-2 border rounded mt-1" 
          value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" placeholder="e.g. Bali, Indonesia" className="w-full p-2 border rounded mt-1" 
          value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" placeholder="Paste an image link here" className="w-full p-2 border rounded mt-1" 
          value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea placeholder="Describe the experience..." className="w-full p-2 border rounded h-32 mt-1" 
          value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (Optional)</label>
          <input type="text" placeholder="e.g. $45" className="w-full p-2 border rounded mt-1" 
          value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          {loading ? "Posting..." : "Publish Experience"}
        </button>
      </form>
    </div>
  );
}