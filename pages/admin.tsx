'use client';

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { useToast } from "../components/ui/use-toast"; // Ensure this path is correct
import { ClipboardCopy } from "lucide-react";
import { db } from '../lib/firebase'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';

export default function AdminPage() {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackCollection = collection(db, 'submissions'); // Replace with your actual collection name
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const feedbackList = feedbackSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate().toLocaleString() : 'N/A' // Convert Firestore Timestamp to a readable format
        }));
        setFeedback(feedbackList);
      } catch (error) {
        console.error("Error fetching feedback: ", error);
        toast({
          title: "Error",
          description: "Failed to fetch feedback.",
          variant: "destructive",
        });
      }
    };

    fetchFeedback();
  }, [toast]);

  const copyEmails = () => {
    const emails = feedback.map(item => item.email).join(", ");
    copyToClipboard(emails, "All emails");
  };

  const copyIndividualEmail = (email: string) => {
    copyToClipboard(email, "Email");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `${type} Copied`,
        description: `${type} has been copied to your clipboard.`,
      });
    }).catch(err => {
      console.error(`Failed to copy ${type.toLowerCase()}: `, err);
      toast({
        title: "Error",
        description: `Failed to copy ${type.toLowerCase()}. Please try again.`,
        variant: "destructive",
      });
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="mb-4">
        <Button onClick={copyEmails}>Copy All Emails</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedback.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.feedback}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyIndividualEmail(item.email)}
                  title="Copy email"
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}