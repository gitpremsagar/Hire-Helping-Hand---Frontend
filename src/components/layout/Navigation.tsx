
"use client";

import DynamicNavItem from "./DynamicNavItem";
import { Briefcase, Users, Search, Star, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function Navigation() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hire Helping Hand
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/freelancing-services" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <Users className="w-4 h-4" />
              <span>Find Services</span>
            </Link>
            <Link 
              href="/jobs" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <Search className="w-4 h-4" />
              <span>Find Jobs</span>
            </Link>
            <Link 
              href="/freelancer" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
            >
              <Star className="w-4 h-4" />
              <span>Become a Freelancer</span>
            </Link>
          </div>

          {/* Desktop Auth & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:block">
              <DynamicNavItem />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Hire Helping Hand
                    </span>
                  </SheetTitle>
                </SheetHeader>
                
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2">
                    <Link 
                      href="/freelancing-services" 
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Users className="w-5 h-5" />
                      <span className="text-lg">Find Services</span>
                    </Link>
                    
                    <Link 
                      href="/jobs" 
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Search className="w-5 h-5" />
                      <span className="text-lg">Find Jobs</span>
                    </Link>
                    
                    <Link 
                      href="/freelancer" 
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Star className="w-5 h-5" />
                      <span className="text-lg">Become a Freelancer</span>
                    </Link>
                  </div>

                  {/* Mobile Auth */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <DynamicNavItem />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
