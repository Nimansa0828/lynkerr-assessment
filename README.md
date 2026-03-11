# Lynkerr - Travel Experience Marketplace

Lynkerr is a full-stack digital platform designed to help travelers discover unique local experiences while empowering small travel businesses. 

## 🚀 Live Demo & Repository
- **Live URL:** [[](https://lynkerr-assessment.vercel.app/)]
- **GitHub Repo:** https://github.com/Nimansa0828/lynkerr-assessment

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

## ✨ Features Implemented
- **User Authentication:** Secure Register and Login system using Supabase Auth.
- **Dynamic Feed:** A real-time feed displaying all travel listings.
- **Create Listing:** Authenticated users can publish new experiences.
- **Dynamic Routing:** Dedicated detail pages for every experience (`/listings/[id]`).
- **Real-time Search:** Users can filter listings by title, location, or description instantly (Bonus Feature).
- **Like/Save System:** Users can "Like" experiences with real-time state updates (Bonus Feature).
- **Owner-Only Deletion:** Secure logic that only allows creators to delete their own listings (Bonus Feature).

## 📐 Architecture & Key Decisions
- **Why this Stack?** I chose Next.js and Supabase because they allow for rapid development without sacrificing power. Next.js provides excellent performance through Server Components, while Supabase offers a robust PostgreSQL database with built-in Auth, allowing me to focus on the Product UI.
- **How Authentication Works:** Authentication is handled by Supabase Auth using the email/password provider. The application maintains a session on the client side, and I implemented a dynamic Navbar that listens to `onAuthStateChange` to switch between Login and Logout views instantly.
- **Database Storage:** Travel listings are stored in a PostgreSQL table. Each listing is linked to a user via a `user_id` foreign key. I utilized a UUID primary key for listings to ensure unique, secure routing.
- **Future Improvement:** If I had more time, I would implement **Image Uploads** to Supabase Storage. Currently, the app uses Image URLs, but allowing users to upload their own photos directly would significantly improve the user experience for local hosts.

---

## 🧠 Product Thinking: Scaling to 10,000 Listings
To ensure the platform remains performant as it grows to 10,000+ listings, I would implement several key optimizations. First, I would replace the current full-list fetch with **Pagination or Infinite Scroll** using Supabase's `.range()` method to load only 20 listings at a time. To keep searches fast, I would add **B-tree Database Indexing** on the `title` and `location` columns in PostgreSQL. For the frontend, I would utilize **Next.js Image Optimization** and a CDN to serve compressed WebP images. Additionally, I would implement **Stale-While-Revalidate (SWR) caching** to store popular listings at the edge, reducing direct database hits. Finally, for a better user experience, I would move the search logic to the server side or use a dedicated tool like **Algolia** to handle complex fuzzy searching across thousands of rows efficiently.

---

## ⚙️ Setup Instructions
1. **Clone the repo:** `git clone https://github.com/Nimansa0828/lynkerr-assessment`
2. **Install dependencies:** `npm install`
3. **Environment Variables:** Create a `.env.local` file and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Run locally:** `npm run dev`