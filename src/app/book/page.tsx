"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function BookNow() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    packageType: "",
    weight: "",
    dimensions: "",
    specialInstructions: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Booking Successful!",
      description: "Your delivery has been scheduled. We'll contact you shortly with the details.",
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Book Your Delivery
            </h1>
            <p className="text-xl text-muted-foreground">
              Fill out the form below to schedule your delivery
            </p>
          </div>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
              <CardDescription>
                Please provide all the necessary information for your delivery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="pickupAddress" className="text-sm font-medium">
                      Pickup Address
                    </label>
                    <Input
                      id="pickupAddress"
                      name="pickupAddress"
                      placeholder="Enter pickup address"
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="deliveryAddress" className="text-sm font-medium">
                      Delivery Address
                    </label>
                    <Input
                      id="deliveryAddress"
                      name="deliveryAddress"
                      placeholder="Enter delivery address"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="packageType" className="text-sm font-medium">
                      Package Type
                    </label>
                    <Input
                      id="packageType"
                      name="packageType"
                      placeholder="e.g., Document, Box"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="weight" className="text-sm font-medium">
                      Weight (kg)
                    </label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="Enter weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dimensions" className="text-sm font-medium">
                      Dimensions (LxWxH)
                    </label>
                    <Input
                      id="dimensions"
                      name="dimensions"
                      placeholder="e.g., 30x20x10"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialInstructions" className="text-sm font-medium">
                    Special Instructions
                  </label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    placeholder="Any special handling requirements?"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="min-h-[100px] bg-background"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contactName" className="text-sm font-medium">
                      Contact Name
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      placeholder="Your name"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactPhone" className="text-sm font-medium">
                      Contact Phone
                    </label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactEmail" className="text-sm font-medium">
                      Contact Email
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      placeholder="Your email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Schedule Delivery
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
