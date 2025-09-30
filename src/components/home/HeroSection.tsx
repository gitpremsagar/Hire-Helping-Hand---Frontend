import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Zap, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hire Helping Hand
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Freelancing marketplace for professional freelancers and clients.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 group-hover:-translate-x-5 z-5" />
              <Input
                type="text"
                placeholder="Search for services, skills, or freelancers..."
                className="pl-16 pr-40 py-6 text-xl border-3 border-gray-300 dark:border-gray-600 rounded-full focus:border-blue-500 dark:focus:border-blue-400 shadow-lg bg-white dark:bg-gray-800 focus:shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-750 transform-gpu"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:translate-x-4"
              >
                Find Freelancer
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-full">
              Browse Services
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 rounded-full">
              Post New Job
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
