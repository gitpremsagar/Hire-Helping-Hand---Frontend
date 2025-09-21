import { Button } from "@/components/ui/button";
import { Briefcase, Users } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of professionals who are already building their success on Hire Helping Hand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Briefcase className="mr-2 w-5 h-5" />
            Find Projects
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-blue-600 hover:text-white hover:bg-blue-600">
            <Users className="mr-2 w-5 h-5" />
            Hire Talent
          </Button>
        </div>
      </div>
    </section>
  );
}
