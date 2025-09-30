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
            Your premier freelancing marketplace connecting skilled professionals with amazing projects. Find quality work and build lasting professional relationships.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search for services, skills, or projects..."
                className="pl-16 pr-40 py-6 text-xl border-3 border-gray-300 dark:border-gray-600 rounded-full focus:border-blue-500 dark:focus:border-blue-400 shadow-lg bg-white dark:bg-gray-800 focus:shadow-xl transition-all duration-300"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Find Freelancer
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-full">
              Browse Services
              <ArrowRight className="ml-2 w-5 h-5" />
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
