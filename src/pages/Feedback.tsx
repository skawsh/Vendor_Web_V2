
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Star, Eye, ArrowLeft, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data for the feedback reviews
const mockReviews = [
  {
    id: 1,
    orderId: "ORD100011000",
    customerName: "Isabella Jackson",
    rating: 2,
    review: "Staff was very friendly and helpful.",
    date: "Mar 23, 2025",
    time: "10:49 PM"
  },
  {
    id: 2,
    orderId: "ORD100011001",
    customerName: "Charlotte Thompson",
    rating: 4,
    review: "N/A",
    date: "Mar 22, 2025",
    time: "10:49 PM"
  }
];

// Mock data for reported studios
const reportedStudios = [
  {
    id: 1,
    userName: "Rahul Sharma",
    mobileNumber: "+91 9876543210",
    studioId: "STU-001",
    studioName: "Cleaners Hub",
    issueReported: "Unhygienic washing process",
    reportsCount: 3,
    date: "Oct 15, 2023",
    time: "10:30 AM"
  },
  {
    id: 2,
    userName: "Priya Patel",
    mobileNumber: "+91 8765432109",
    studioId: "STU-005",
    studioName: "Eco Laundry",
    issueReported: "Wrong service provided",
    reportsCount: 1,
    date: "Oct 14, 2023",
    time: "2:45 PM"
  },
  {
    id: 3,
    userName: "Amit Singh",
    mobileNumber: "+91 7654321098",
    studioId: "STU-008",
    studioName: "Quick Wash",
    issueReported: "Poor quality of cleaning, stains",
    reportsCount: 5,
    date: "Oct 13, 2023",
    time: "9:15 AM"
  }
];

const FeedbackPage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reviews");

  // Calculate statistics
  const totalRatings = mockReviews.length;
  const totalReviews = mockReviews.filter(r => r.review && r.review !== "N/A").length;
  const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / (totalRatings || 1);

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="container p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(-1)}
          className="h-9 w-9"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Feedback</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">Customer Reviews</TabsTrigger>
          <TabsTrigger value="reported" className="flex-1 sm:flex-initial">Reported Studios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Average Rating</h2>
                <div className="flex items-center">
                  <span className="text-4xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-gray-500 mt-2">based on {totalRatings} customer ratings</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Total Ratings</h2>
                <div className="text-4xl font-bold">{totalRatings}</div>
                <p className="text-gray-500 mt-2">ratings received</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Total Reviews</h2>
                <div className="text-4xl font-bold">{totalReviews}</div>
                <p className="text-gray-500 mt-2">reviews received</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-lg">Filter by:</span>
              <div className="w-48">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <span>Rating</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                All Reviews & Ratings
              </Button>
            </div>
            
            <div className="w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <span>Sort by</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rating</SelectItem>
                  <SelectItem value="lowest">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Reviews Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">S.NO</TableHead>
                  <TableHead className="w-32">Order ID</TableHead>
                  <TableHead className="w-40">Customer Name</TableHead>
                  <TableHead className="w-40">Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead className="w-40">Date & Time</TableHead>
                  <TableHead className="w-40 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>{review.id}</TableCell>
                    <TableCell className="font-mono text-sm">{review.orderId}</TableCell>
                    <TableCell>{review.customerName}</TableCell>
                    <TableCell>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </TableCell>
                    <TableCell>{review.review}</TableCell>
                    <TableCell>
                      <div>{review.date}</div>
                      <div className="text-gray-500">{review.time}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> View Order
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="reported">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Reported Studios</h2>
            </div>
            <p className="text-gray-500">Studios that have been reported by users for various issues</p>
          </div>
          
          {/* Reported Studios Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">S.NO</TableHead>
                  <TableHead className="w-40">User Name</TableHead>
                  <TableHead className="w-40">Mobile Number</TableHead>
                  <TableHead className="w-32">Studio ID</TableHead>
                  <TableHead className="w-40">Studio Name</TableHead>
                  <TableHead>Issue Reported</TableHead>
                  <TableHead className="w-32 text-center">Reports Count</TableHead>
                  <TableHead className="w-40">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedStudios.map((studio) => (
                  <TableRow key={studio.id}>
                    <TableCell>{studio.id}</TableCell>
                    <TableCell>{studio.userName}</TableCell>
                    <TableCell className="font-mono text-sm">{studio.mobileNumber}</TableCell>
                    <TableCell className="font-mono text-sm">{studio.studioId}</TableCell>
                    <TableCell>{studio.studioName}</TableCell>
                    <TableCell>{studio.issueReported}</TableCell>
                    <TableCell className="text-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {studio.reportsCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>{studio.date}</div>
                      <div className="text-gray-500">{studio.time}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackPage;
