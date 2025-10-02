"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { resetAuth } from "@/lib/modules/auth/auth.redux.slice";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, LogOut, Settings, Briefcase, Search, Home, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/lib/modules/auth/useLogOut";

export default function DynamicNavItem() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { logout, isLoading, error, clearError } = useLogout();
  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    logout();  
    clearError();
    router.push("/");
  };

  if (!auth.isAuthenticated) {
    return (
      <>
        <Button variant="ghost" className="hidden sm:inline-flex">
          <Link href="/log-in">Log In</Link>
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </>
    );
  }

  // if user is authenticated
  return (
    <div className="flex items-center space-x-4">
      {/* Navigation Links for Authenticated Users */}
      <div className="hidden md:flex items-center space-x-6">
        <Link 
          href="/" 
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        
        {auth.user?.isFreelancer && (
          <Link 
            href="/freelancer" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
          >
            <Briefcase className="w-4 h-4" />
            <span>My Services</span>
          </Link>
        )}
        
        <Link 
          href="/jobs" 
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors flex items-center space-x-1"
        >
          <Search className="w-4 h-4" />
          <span>Find Jobs</span>
        </Link>
      </div>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={auth.user?.avatar || ""} alt={auth.user?.name || ""} />
              <AvatarFallback>
                {auth.user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{auth.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {auth.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          
          {auth.user?.isFreelancer && (
            <DropdownMenuItem asChild>
              <Link href="/freelancer" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>My Services</span>
              </Link>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e: React.MouseEvent<HTMLDivElement>) => handleLogout(e)} className="text-red-600" disabled={isLoading}>
            <LogOut className="mr-2 h-4 w-4 text-red-600" />
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Log out</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
