import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Clock, Globe, Star, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Hire Helping Hand?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;ve built the most trusted platform for connecting clients with talented freelancers worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Verified Professionals</CardTitle>
              <CardDescription>
                All freelancers are thoroughly vetted and verified to ensure quality and reliability.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>
                Your payments are protected with our secure escrow system and money-back guarantee.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Fast Matching</CardTitle>
              <CardDescription>
                Our AI-powered matching system connects you with the right freelancers in minutes.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Global Reach</CardTitle>
              <CardDescription>
                Access talented professionals from around the world, available 24/7.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle>Quality Guarantee</CardTitle>
              <CardDescription>
                We ensure high-quality work with our review system and satisfaction guarantee.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Growth Focused</CardTitle>
              <CardDescription>
                Build long-term relationships and grow your business with our platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
