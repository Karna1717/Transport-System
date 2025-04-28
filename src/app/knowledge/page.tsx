"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Package, Truck, CreditCard, Shield, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      "How to create an account",
      "Understanding shipping rates",
      "Setting up your first shipment",
      "Account verification process",
    ],
  },
  {
    title: "Shipping Services",
    icon: Package,
    articles: [
      "Available shipping methods",
      "International shipping guide",
      "Express shipping options",
      "Bulk shipping discounts",
    ],
  },
  {
    title: "Tracking & Delivery",
    icon: Truck,
    articles: [
      "How to track your package",
      "Delivery time estimates",
      "Handling delivery issues",
      "Signature requirements",
    ],
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    articles: [
      "Accepted payment methods",
      "Understanding shipping costs",
      "Billing cycle information",
      "Refund policy",
    ],
  },
  {
    title: "Security & Safety",
    icon: Shield,
    articles: [
      "Package insurance options",
      "Secure packaging guidelines",
      "Handling fragile items",
      "Security measures",
    ],
  },
  {
    title: "Support",
    icon: HelpCircle,
    articles: [
      "Contacting customer support",
      "FAQ",
      "Live chat assistance",
      "Email support",
    ],
  },
];

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some((article) =>
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Knowledge Base
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and learn more about our services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Card
              key={category.title}
              className={cn(
                "transition-all hover:shadow-lg",
                selectedCategory === category.title && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedCategory(category.title)}
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{category.title}</CardTitle>
                </div>
                <CardDescription>
                  {category.articles.length} articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li
                      key={article}
                      className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      {article}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help.
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