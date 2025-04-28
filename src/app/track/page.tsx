"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Clock, AlertCircle, Truck, CheckCircle2, XCircle, Bell, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Mock tracking data
const mockTrackingData = {
  trackingNumber: "TRK123456789",
  status: "In Transit",
  estimatedDelivery: "2024-03-20",
  origin: "New York, USA",
  destination: "Los Angeles, USA",
  weight: "2.5 kg",
  dimensions: "30 x 20 x 15 cm",
  serviceType: "Express",
  timeline: [
    {
      date: "2024-03-15 10:30",
      status: "Package Received",
      location: "New York Distribution Center",
      description: "Package received at origin facility",
    },
    {
      date: "2024-03-15 14:45",
      status: "In Transit",
      location: "New York Distribution Center",
      description: "Package departed from origin facility",
    },
    {
      date: "2024-03-16 09:15",
      status: "In Transit",
      location: "Chicago Hub",
      description: "Package arrived at sorting facility",
    },
    {
      date: "2024-03-16 12:30",
      status: "In Transit",
      location: "Chicago Hub",
      description: "Package departed from sorting facility",
    },
    {
      date: "2024-03-17 08:00",
      status: "In Transit",
      location: "Los Angeles Distribution Center",
      description: "Package arrived at destination facility",
    },
  ],
  currentLocation: {
    city: "Los Angeles",
    state: "California",
    country: "USA",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  recipient: {
    name: "John Doe",
    address: "123 Main St, Los Angeles, CA 90001",
    phone: "+1 (555) 123-4567",
  },
  sender: {
    name: "Jane Smith",
    address: "456 Broadway, New York, NY 10001",
    phone: "+1 (555) 987-6543",
  },
};

export default function TrackPage() {
  const { toast } = useToast();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    emailAddress: "",
    phoneNumber: "",
  });
  const [reportIssue, setReportIssue] = useState({
    issueType: "",
    description: "",
    contactEmail: "",
  });
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: "",
    reportEmail: "",
  });

  const handleTrack = () => {
    // In a real application, this would make an API call
    setShowDetails(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in transit":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "exception":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleNotificationChange = (type: 'email' | 'sms', value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: value
    }));
    // Clear validation errors when toggling off
    if (!value) {
      setValidationErrors(prev => ({
        ...prev,
        [type === 'email' ? 'email' : 'phone']: ""
      }));
    }
  };

  const handleEmailChange = (email: string) => {
    setNotifications(prev => ({ ...prev, emailAddress: email }));
    if (email && !validateEmail(email)) {
      setValidationErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneChange = (phone: string) => {
    setNotifications(prev => ({ ...prev, phoneNumber: phone }));
    if (phone && !validatePhone(phone)) {
      setValidationErrors(prev => ({ ...prev, phone: "Please enter a valid phone number" }));
    } else {
      setValidationErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleReportEmailChange = (email: string) => {
    setReportIssue(prev => ({ ...prev, contactEmail: email }));
    if (email && !validateEmail(email)) {
      setValidationErrors(prev => ({ ...prev, reportEmail: "Please enter a valid email address" }));
    } else {
      setValidationErrors(prev => ({ ...prev, reportEmail: "" }));
    }
  };

  const handleReportSubmit = () => {
    if (!reportIssue.issueType || !reportIssue.description || !reportIssue.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(reportIssue.contactEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send the report to the backend
    console.log('Report submitted:', reportIssue);
    setShowReportDialog(false);
    setShowConfirmation(true);
    setReportIssue({ issueType: "", description: "", contactEmail: "" });

    toast({
      title: "Report Submitted",
      description: "Thank you for reporting the issue. We'll get back to you soon.",
      duration: 5000,
    });
  };

  const handleSaveNotifications = () => {
    if (notifications.email && !validateEmail(notifications.emailAddress)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (notifications.sms && !validatePhone(notifications.phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notifications Saved",
      description: "Your notification preferences have been updated",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Track Your Parcel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTrack}>Track</Button>
          </div>
        </div>

        {showDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tracking Card */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tracking Information</CardTitle>
                      <CardDescription>Tracking Number: {mockTrackingData.trackingNumber}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(mockTrackingData.status)}
                      <span className="font-medium">{mockTrackingData.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Timeline */}
                    <div className="relative">
                      {mockTrackingData.timeline.map((event, index) => (
                        <div key={index} className="relative pl-8 pb-8 last:pb-0">
                          <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-primary" />
                          {index < mockTrackingData.timeline.length - 1 && (
                            <div className="absolute left-[7px] top-4 w-0.5 h-full bg-primary/20" />
                          )}
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{event.status}</h4>
                              <span className="text-sm text-muted-foreground">{event.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                            <p className="text-sm mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Location</CardTitle>
                  <CardDescription>Package is currently in {mockTrackingData.currentLocation.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                    <span className="ml-2">Map View Coming Soon</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-8">
              {/* Package Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Package Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Type</span>
                    <span>{mockTrackingData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{mockTrackingData.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>{mockTrackingData.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Delivery</span>
                    <span>{mockTrackingData.estimatedDelivery}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Recipient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{mockTrackingData.recipient.name}</p>
                    <p className="text-sm text-muted-foreground">{mockTrackingData.recipient.address}</p>
                    <p className="text-sm text-muted-foreground">{mockTrackingData.recipient.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sender Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Sender Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{mockTrackingData.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{mockTrackingData.sender.address}</p>
                    <p className="text-sm text-muted-foreground">{mockTrackingData.sender.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Notification Options</CardTitle>
                  <CardDescription>Get updates about your shipment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-notification"
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked as boolean)}
                      />
                      <Label htmlFor="email-notification" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Email Notifications
                      </Label>
                    </div>
                    {notifications.email && (
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={notifications.emailAddress}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          className={cn(validationErrors.email && "border-red-500")}
                        />
                        {validationErrors.email && (
                          <p className="text-sm text-red-500">{validationErrors.email}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms-notification"
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked as boolean)}
                      />
                      <Label htmlFor="sms-notification" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        SMS Notifications
                      </Label>
                    </div>
                    {notifications.sms && (
                      <div className="space-y-2">
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={notifications.phoneNumber}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className={cn(validationErrors.phone && "border-red-500")}
                        />
                        {validationErrors.phone && (
                          <p className="text-sm text-red-500">{validationErrors.phone}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <Button className="w-full" onClick={handleSaveNotifications}>
                    Save Notifications
                  </Button>
                </CardContent>
              </Card>

              {/* Report Issue */}
              <Card>
                <CardHeader>
                  <CardTitle>Report an Issue</CardTitle>
                  <CardDescription>Having problems with your shipment?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Report Issue
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report a Shipping Issue</DialogTitle>
                        <DialogDescription>
                          Please provide details about the issue you're experiencing with your shipment.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="issueType">Issue Type</Label>
                          <Select
                            value={reportIssue.issueType}
                            onValueChange={(value) => setReportIssue(prev => ({ ...prev, issueType: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select issue type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="delayed">Delivery Delayed</SelectItem>
                              <SelectItem value="damaged">Package Damaged</SelectItem>
                              <SelectItem value="lost">Package Lost</SelectItem>
                              <SelectItem value="wrong">Wrong Delivery</SelectItem>
                              <SelectItem value="other">Other Issue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Please describe the issue in detail"
                            value={reportIssue.description}
                            onChange={(e) => setReportIssue(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            placeholder="Enter your email for updates"
                            value={reportIssue.contactEmail}
                            onChange={(e) => handleReportEmailChange(e.target.value)}
                            className={cn(validationErrors.reportEmail && "border-red-500")}
                          />
                          {validationErrors.reportEmail && (
                            <p className="text-sm text-red-500">{validationErrors.reportEmail}</p>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleReportSubmit}>
                          Submit Report
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find your tracking number or having issues? Our support team is here to help.
          </p>
          <div className="flex gap-4 justify-center">
            <Button>Contact Support</Button>
            <Button variant="outline">Live Chat</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
