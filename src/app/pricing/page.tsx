"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChatBot } from "@/components/ChatBot";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const pricingPlans = [
  {
    name: "Standard",
    description: "Perfect for occasional shipments",
    price: "$5.99",
    features: [
      "Up to 5kg weight limit",
      "Standard delivery (3-5 days)",
      "Basic tracking",
      "Email support",
      "Insurance up to $100",
    ],
    popular: false,
  },
  {
    name: "Express",
    description: "Best for regular shipments",
    price: "$9.99",
    features: [
      "Up to 10kg weight limit",
      "Express delivery (1-2 days)",
      "Advanced tracking",
      "Priority support",
      "Insurance up to $500",
      "Free packaging",
    ],
    popular: true,
  },
  {
    name: "Premium",
    description: "For businesses and bulk shipments",
    price: "$19.99",
    features: [
      "Up to 20kg weight limit",
      "Same day delivery",
      "Real-time tracking",
      "24/7 dedicated support",
      "Insurance up to $2000",
      "Free packaging",
      "Bulk shipping discounts",
      "API access",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "How is shipping cost calculated?",
    answer: "Shipping costs are based on package weight, dimensions, and destination. Our pricing calculator will give you an exact quote based on these factors. We also consider delivery speed and any additional services you might need.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle. There are no penalties for changing plans, and you'll only pay for the time you use each plan.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely with encryption to protect your financial information.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No, all our plans are month-to-month with no long-term commitment. You can cancel anytime without any penalties. We believe in earning your business every month.",
  },
  {
    question: "How do I track my shipment?",
    answer: "You can track your shipment through our website or mobile app using your tracking number. We provide real-time updates on your package's location and estimated delivery time.",
  },
  {
    question: "What happens if my package is lost or damaged?",
    answer: "All our plans include insurance coverage. If your package is lost or damaged, we'll help you file a claim and process your reimbursement according to your plan's coverage limits.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({
    length: 20,
    width: 20,
    height: 20,
    weight: 1,
  });
  const [destination, setDestination] = useState("");
  const [serviceType, setServiceType] = useState("standard");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [specialHandling, setSpecialHandling] = useState({
    fragile: false,
    temperature: false,
    signature: false,
    weekend: false,
    early: false,
  });
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState({
    basePrice: 0,
    volumeCharge: 0,
    weightCharge: 0,
    distanceCharge: 0,
    specialHandling: 0,
    insurance: 0,
    total: 0,
  });

  const calculatePrice = () => {
    // Base prices for different service types
    const basePrices = {
      standard: 5.99,
      express: 9.99,
      premium: 19.99,
    };

    // Get base price based on service type
    let totalPrice = basePrices[serviceType as keyof typeof basePrices];
    let breakdown = {
      basePrice: totalPrice,
      volumeCharge: 0,
      weightCharge: 0,
      distanceCharge: 0,
      specialHandling: 0,
      insurance: 0,
      total: 0,
    };

    // Calculate volume in cubic meters
    const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000000; // convert to m³

    // Volume-based pricing
    const volumeCharge = Math.max(0, (volume * 2)); // $2 per m³
    totalPrice += volumeCharge;
    breakdown.volumeCharge = volumeCharge;

    // Weight-based pricing
    const weightCharge = Math.max(0, (dimensions.weight / 5)); // $1 per 5kg
    totalPrice += weightCharge;
    breakdown.weightCharge = weightCharge;

    // Distance-based pricing
    const distanceCharge = destination ? totalPrice * 0.2 : 0; // 20% increase for non-local
    totalPrice += distanceCharge;
    breakdown.distanceCharge = distanceCharge;

    // Special handling fees
    const specialHandlingFees = {
      fragile: 2.99,
      temperature: 4.99,
      signature: 1.99,
      weekend: 3.99,
      early: 2.99,
    };

    // Calculate special handling charges
    let handlingCharge = 0;
    Object.entries(specialHandling).forEach(([key, value]) => {
      if (value) {
        handlingCharge += specialHandlingFees[key as keyof typeof specialHandlingFees];
      }
    });
    totalPrice += handlingCharge;
    breakdown.specialHandling = handlingCharge;

    // Insurance calculation
    const insuranceRates = {
      standard: 0.01,
      express: 0.015,
      premium: 0.02,
    };
    const insuranceCharge = insuranceValue * insuranceRates[serviceType as keyof typeof insuranceRates];
    totalPrice += insuranceCharge;
    breakdown.insurance = insuranceCharge;

    // Seasonal discount (10% off for example)
    const seasonalDiscount = totalPrice * 0.1;
    totalPrice -= seasonalDiscount;

    // Minimum price guarantee
    totalPrice = Math.max(totalPrice, basePrices[serviceType as keyof typeof basePrices]);
    breakdown.total = totalPrice;

    setPriceBreakdown(breakdown);
    setEstimatedPrice(Number(totalPrice.toFixed(2)));
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your shipping needs. All plans include basic tracking and support.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Shipping Calculator</h2>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">Insurance Value ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter insurance value"
                    value={insuranceValue}
                    onChange={(e) => setInsuranceValue(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-medium">Special Handling</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={specialHandling.fragile}
                        onChange={(e) => setSpecialHandling({ ...specialHandling, fragile: e.target.checked })}
                      />
                      <label>Fragile Items</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={specialHandling.temperature}
                        onChange={(e) => setSpecialHandling({ ...specialHandling, temperature: e.target.checked })}
                      />
                      <label>Temperature Control</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={specialHandling.signature}
                        onChange={(e) => setSpecialHandling({ ...specialHandling, signature: e.target.checked })}
                      />
                      <label>Signature Required</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={specialHandling.weekend}
                        onChange={(e) => setSpecialHandling({ ...specialHandling, weekend: e.target.checked })}
                      />
                      <label>Weekend Delivery</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={specialHandling.early}
                        onChange={(e) => setSpecialHandling({ ...specialHandling, early: e.target.checked })}
                      />
                      <label>Early Morning Delivery</label>
                    </div>
                  </div>
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
                    <span>{(dimensions.length * dimensions.width * dimensions.height / 1000000).toFixed(2)} m³</span>
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

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowBreakdown(!showBreakdown)}
                >
                  {showBreakdown ? "Hide Price Breakdown" : "Show Price Breakdown"}
                </Button>

                {showBreakdown && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Base Price</span>
                      <span>${priceBreakdown.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volume Charge</span>
                      <span>${priceBreakdown.volumeCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight Charge</span>
                      <span>${priceBreakdown.weightCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance Charge</span>
                      <span>${priceBreakdown.distanceCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Special Handling</span>
                      <span>${priceBreakdown.specialHandling.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance</span>
                      <span>${priceBreakdown.insurance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>${priceBreakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    Book This Shipment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative flex flex-col",
                plan.popular && "border-primary shadow-lg"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/shipment</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={cn(
                    "w-full",
                    plan.popular && "bg-primary hover:bg-primary/90"
                  )}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our shipping services and pricing plans.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-accent/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}
