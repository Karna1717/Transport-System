"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Package, Truck, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "standard",
    packageWeight: "",
    packageDescription: "",
    specialInstructions: ""
  });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookingsResponse = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData.bookings || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to refresh bookings. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.user);
        
        // Fetch user's bookings
        await fetchBookings();
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load your profile. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      
      // Reset form
      setFormData({
        pickupAddress: "",
        deliveryAddress: "",
        packageType: "standard",
        packageWeight: "",
        packageDescription: "",
        specialInstructions: ""
      });
      
      // Show success message
      toast({
        title: "Success",
        description: "Your parcel booking has been created successfully!",
      });
      
      // Refresh bookings and switch to bookings tab
      await fetchBookings();
      setActiveTab("bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(booking => booking.status === "in-transit").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(booking => booking.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter(booking => booking.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="book">Book a Parcel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.name || "User"}!</CardTitle>
              <CardDescription>Here's an overview of your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <div className="mt-2 space-y-2">
                      <p><span className="font-medium">Name:</span> {user?.name}</p>
                      <p><span className="font-medium">Email:</span> {user?.email}</p>
                      <p><span className="font-medium">Member since:</span> {new Date(user?.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium">Recent Activity</h3>
                    <div className="mt-2 space-y-2">
                      {bookings.length > 0 ? (
                        <ul className="space-y-2">
                          {bookings.slice(0, 3).map((booking) => (
                            <li key={booking._id} className="flex items-center space-x-2">
                              <Package className="h-4 w-4 text-primary" />
                              <span>Booked a {booking.packageType} parcel on {new Date(booking.createdAt).toLocaleDateString()}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No recent activity</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      className="flex flex-col items-center justify-center h-24 p-4"
                      onClick={() => setActiveTab("book")}
                    >
                      <Package className="h-6 w-6 mb-2" />
                      <span>Book a Parcel</span>
                    </Button>
                    <Button 
                      className="flex flex-col items-center justify-center h-24 p-4"
                      onClick={() => setActiveTab("bookings")}
                    >
                      <Truck className="h-6 w-6 mb-2" />
                      <span>Track Deliveries</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and track all your parcel bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking._id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">Booking #{booking._id.slice(-6)}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === "delivered" ? "bg-green-100 text-green-800" :
                            booking.status === "in-transit" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {booking.status === "delivered" ? "Delivered" :
                             booking.status === "in-transit" ? "In Transit" :
                             "Pending"}
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-4 w-4 text-primary mt-1" />
                              <div>
                                <p className="text-sm font-medium">Pickup</p>
                                <p className="text-sm">{booking.pickupAddress}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <MapPin className="h-4 w-4 text-primary mt-1" />
                              <div>
                                <p className="text-sm font-medium">Delivery</p>
                                <p className="text-sm">{booking.deliveryAddress}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-start space-x-2">
                              <Package className="h-4 w-4 text-primary mt-1" />
                              <div>
                                <p className="text-sm font-medium">Package</p>
                                <p className="text-sm capitalize">{booking.packageType} - {booking.packageWeight}kg</p>
                              </div>
                            </div>
                            {booking.trackingNumber && (
                              <div className="flex items-start space-x-2">
                                <Clock className="h-4 w-4 text-primary mt-1" />
                                <div>
                                  <p className="text-sm font-medium">Tracking Number</p>
                                  <p className="text-sm font-mono">{booking.trackingNumber}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">You haven't made any parcel bookings yet.</p>
                  <Button onClick={() => setActiveTab("book")}>Book a Parcel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="book" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Book a Parcel</CardTitle>
              <CardDescription>Fill out the form below to book a parcel delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address</Label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      placeholder="Street, City, State, ZIP Code, Country"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      required
                      className="auth-input"
                    />
                    <p className="text-sm text-muted-foreground">
                      Please enter the address in the format: Street, City, State, ZIP Code, Country
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      placeholder="Street, City, State, ZIP Code, Country"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      className="auth-input"
                    />
                    <p className="text-sm text-muted-foreground">
                      Please enter the address in the format: Street, City, State, ZIP Code, Country
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="packageType">Package Type</Label>
                    <select
                      id="packageType"
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="standard">Standard</option>
                      <option value="express">Express</option>
                      <option value="fragile">Fragile</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="packageWeight">Package Weight (kg)</Label>
                    <Input
                      id="packageWeight"
                      name="packageWeight"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={formData.packageWeight}
                      onChange={handleInputChange}
                      placeholder="Enter package weight"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="packageDescription">Package Description</Label>
                  <Textarea
                    id="packageDescription"
                    name="packageDescription"
                    value={formData.packageDescription}
                    onChange={handleInputChange}
                    placeholder="Describe your package"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Book Parcel"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 