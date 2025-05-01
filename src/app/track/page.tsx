"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Package, Clock, AlertCircle, Truck, CheckCircle2, XCircle, Bell, MessageSquare, AlertTriangle, CheckCircle, Calendar, Scale, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TrackPage() {
  const { toast } = useToast();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBooking(null);

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/track/${trackingNumber}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tracking information");
      }

      setBooking(data);
      toast({
        title: "Tracking Information Found",
        description: "Your package details have been retrieved successfully.",
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "picked_up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "picked_up":
        return <Package className="h-5 w-5" />;
      case "in_transit":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  const getTrackingTimeline = (booking) => {
    const timeline = [];
    
    // Add creation date
    timeline.push({
      date: booking.createdAt,
      status: "pending",
      description: "Booking created",
      location: booking.pickupAddress.city
    });

    // Add status changes
    if (booking.status === "picked_up" || booking.status === "in_transit" || booking.status === "delivered") {
      timeline.push({
        date: booking.updatedAt,
        status: booking.status,
        description: `Package ${booking.status.replace('_', ' ')}`,
        location: booking.status === "delivered" ? booking.deliveryAddress.city : "In Transit"
      });
    }

    // Add estimated delivery
    timeline.push({
      date: booking.estimatedDeliveryDate,
      status: "estimated",
      description: "Estimated delivery date",
      location: booking.deliveryAddress.city
    });

    // Add actual delivery if delivered
    if (booking.actualDeliveryDate) {
      timeline.push({
        date: booking.actualDeliveryDate,
        status: "delivered",
        description: "Package delivered",
        location: booking.deliveryAddress.city
      });
    }

    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Track Your Package</CardTitle>
            <CardDescription className="text-center">
              Enter your tracking number to get real-time updates on your package
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    "Track"
                  )}
                </Button>
              </div>
              {error && (
                <div className="text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {booking && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tracking Details</CardTitle>
                    <CardDescription>Tracking Number: {booking.trackingNumber}</CardDescription>
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-full flex items-center gap-2 border",
                    getStatusColor(booking.status)
                  )}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status.replace('_', ' ')}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Box className="h-4 w-4" />
                      Package Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type:</span> {booking.packageType}</p>
                      <p><span className="font-medium">Weight:</span> {booking.weight} kg</p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Estimated Delivery:</span> {formatDate(booking.estimatedDeliveryDate)}
                      </p>
                      {booking.actualDeliveryDate && (
                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="font-medium">Actual Delivery:</span> {formatDate(booking.actualDeliveryDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Addresses
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="font-medium">Pickup Address:</p>
                        <p>{booking.pickupAddress.street}</p>
                        <p>{booking.pickupAddress.city}, {booking.pickupAddress.state} {booking.pickupAddress.zipCode}</p>
                        <p>{booking.pickupAddress.country}</p>
                      </div>
                      <div>
                        <p className="font-medium">Delivery Address:</p>
                        <p>{booking.deliveryAddress.street}</p>
                        <p>{booking.deliveryAddress.city}, {booking.deliveryAddress.state} {booking.deliveryAddress.zipCode}</p>
                        <p>{booking.deliveryAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
                <CardDescription>Detailed timeline of your package's journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {getTrackingTimeline(booking).map((event, index) => (
                    <div key={index} className="flex gap-4 pb-8 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          getStatusColor(event.status)
                        )}>
                          {getStatusIcon(event.status)}
                        </div>
                        {index !== getTrackingTimeline(booking).length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium capitalize">{event.description}</h4>
                          <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
