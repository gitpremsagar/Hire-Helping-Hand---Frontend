import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hire Helping Hand
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Link href="/log-in">
                Log In
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
