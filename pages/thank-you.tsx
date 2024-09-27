import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from 'next/router';

export default function ThankYou() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/'); // Redirect to the home page or the form page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-600 p-4">
      <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Thank You!</h2>
          <p className="text-gray-700 mb-4">You've been added to our waiting list. We'll notify you when CustomerEcho launches!</p>
          <Button 
            onClick={handleBack} 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Back to Form
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}