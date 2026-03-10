import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* Brand Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
        Lynkerr
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          Explore
        </Link>
        
        <Link 
          href="/create" 
          className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center"
        >
          <span className="mr-1 text-xl">+</span> Post Experience
        </Link>

        {/* Action Button */}
        <Link 
          href="/login" 
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all font-semibold shadow-md shadow-blue-100"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}