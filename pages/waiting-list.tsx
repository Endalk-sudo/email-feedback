import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from '../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle2, BarChart2, Users, TrendingUp, Zap, MessageCircle, DollarSign, Brain, LineChart, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase'; // Adjust the import path as necessary
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function WaitingList() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Define isSubmitted state
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, 'submissions'), {
        email,
        feedback,
        date: Timestamp.now() // Store the current date and time
      });

      // Set isSubmitted to true
      setIsSubmitted(true);

      // Redirect to the Thank You page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: 'Error!',
        description: 'There was an error submitting your email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: BarChart2, text: 'Gain Real-Time Customer Insights' },
    { icon: Users, text: 'Boost Customer Retention & Satisfaction' },
    { icon: TrendingUp, text: 'Increase Revenue by Meeting Market Demands' },
    { icon: Zap, text: 'Stay Ahead of Competitors' },
    { icon: MessageCircle, text: 'Direct Connection to Your Customers' },
    { icon: DollarSign, text: 'Improve Products and Services Without Added Costs' },
    { icon: Brain, text: 'Make Smarter Business Decisions with Confidence' },
    { icon: LineChart, text: 'Track Trends and Feedback Over Time' },
    { icon: Sparkles, text: 'Increase Revenue with Customer-Driven Improvements' },
  ];

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-600 p-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Thank You!</h2>
            <p className="text-gray-700 mb-4">
              You've been added to our waiting list. We'll notify you when CustomerEcho launches!
            </p>
            <Button onClick={() => router.push('/')} variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
              Go Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 to-blue-600 p-4">
      <Card className="max-w-4xl w-full">
        <CardHeader>
          <CardTitle className="text-center">Join CustomerEcho's Waiting List</CardTitle>
          <p className="text-center text-gray-700">Collect Customer Feedback Effortlessly. Improve Your Business Instantly.</p>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">We'd love to hear from you!     It is optional. </label>
                <Textarea
                  id="feedback"
                  placeholder="Let us know what features you want in CustomerEcho and how much you'd pay for it."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Join Waiting List'}
              </Button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Benefits of Using CustomerEcho</h2>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <benefit.icon className="mr-2 w-5 h-5 text-teal-500" />
                  {benefit.text}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}