"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function CalculatorPage() {
  const [dimensions, setDimensions] = useState({
    length: 20,
    width: 20,
    height: 20,
    weight: 1,
  });

  const [destination, setDestination] = useState("");
  const [serviceType, setServiceType] = useState("standard");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const calculatePrice = () => {
    // Base price calculation
    let basePrice = 5.99;
    const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000; // in cubic cm

    // Adjust price based on service type
    if (serviceType === "express") {
      basePrice = 9.99;
    } else if (serviceType === "premium") {
      basePrice = 19.99;
    }

    // Adjust price based on weight
    const weightMultiplier = Math.max(1, dimensions.weight / 5);
    basePrice *= weightMultiplier;

    // Adjust price based on volume
    const volumeMultiplier = Math.max(1, volume / 1000);
    basePrice *= volumeMultiplier;

    setEstimatedPrice(Number(basePrice.toFixed(2)));
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Shipping Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant quote for your shipment based on package dimensions and destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
              <CardDescription>Enter your package dimensions and weight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Length (cm)</label>
                <Slider
                  value={[dimensions.length]}
                  onValueChange={([value]) => setDimensions({ ...dimensions, length: value })}
                  min={1}
                  max={200}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 cm</span>
                  <span>{dimensions.length} cm</span>
                  <span>200 cm</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Width (cm)</label>
                <Slider
                  value={[dimensions.width]}
                  onValueChange={([value]) => setDimensions({ ...dimensions, width: value })}
                  min={1}
                  max={200}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 cm</span>
                  <span>{dimensions.width} cm</span>
                  <span>200 cm</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm)</label>
                <Slider
                  value={[dimensions.height]}
                  onValueChange={([value]) => setDimensions({ ...dimensions, height: value })}
                  min={1}
                  max={200}
                  step={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 cm</span>
                  <span>{dimensions.height} cm</span>
                  <span>200 cm</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <Slider
                  value={[dimensions.weight]}
                  onValueChange={([value]) => setDimensions({ ...dimensions, weight: value })}
                  min={0.1}
                  max={50}
                  step={0.1}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0.1 kg</span>
                  <span>{dimensions.weight} kg</span>
                  <span>50 kg</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <Input
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                    <SelectItem value="express">Express (1-2 days)</SelectItem>
                    <SelectItem value="premium">Premium (Same day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={calculatePrice}>
                Calculate Price
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>Estimated Price</CardTitle>
              <CardDescription>Your shipping cost estimate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="text-4xl font-bold text-primary mb-2">
                  ${estimatedPrice}
                </div>
                <p className="text-muted-foreground">per shipment</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Package Volume</span>
                  <span>{(dimensions.length * dimensions.width * dimensions.height / 1000).toFixed(2)} L</span>
                </div>
                <div className="flex justify-between">
                  <span>Weight</span>
                  <span>{dimensions.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Type</span>
                  <span className="capitalize">{serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {serviceType === "standard" ? "3-5 days" :
                     serviceType === "express" ? "1-2 days" : "Same day"}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Book This Shipment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            Our shipping experts are here to help you with any questions about pricing or services.
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
} 