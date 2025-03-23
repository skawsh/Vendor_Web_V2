
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackText('');
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
    }, 1000);
  };

  return (
    <div className="container p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <p className="text-muted-foreground mb-8">
        We value your feedback. Let us know what you think about our service or suggest improvements.
      </p>
      
      <div className="grid gap-6">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>
                Your feedback helps us improve our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedbackType">Feedback Type</Label>
                <Select 
                  value={feedbackType}
                  onValueChange={setFeedbackType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a feedback type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="issue">Report an Issue</SelectItem>
                    <SelectItem value="compliment">Compliment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Please share your thoughts..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={6}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting || !feedbackText.trim()}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackPage;
