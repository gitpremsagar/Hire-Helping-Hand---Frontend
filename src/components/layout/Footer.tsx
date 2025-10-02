import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Hire Helping Hand</span>
            </div>
            <p className="text-gray-400">
              Connecting talented freelancers with amazing clients worldwide.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Freelancers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Find Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Build Portfolio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Get Paid</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learn & Grow</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Hire Talent</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Post Projects</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Manage Work</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Progress</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hire Helping Hand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
