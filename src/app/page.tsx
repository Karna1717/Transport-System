"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const testimonials = [
  {
    name: "Alice Johnson",
    title: "Small Business Owner",
    quote: "TranspoEase has transformed how we handle our deliveries. It's efficient, reliable, and incredibly user-friendly!",
    image: "https://picsum.photos/50/50?random=1",
  },
  {
    name: "Bob Williams",
    title: "E-commerce Manager",
    quote: "The real-time tracking feature has significantly improved our customer satisfaction. Highly recommended!",
    image: "https://picsum.photos/50/50?random=2",
  },
  {
    name: "Charlie Brown",
    title: "Retail Store Owner",
    quote: "We've been using TranspoEase for our local deliveries and the service is top-notch. Our customers are happy and so are we!",
    image: "https://picsum.photos/50/50?random=8",
  },
  {
    name: "Diana Miller",
    title: "Online Boutique Owner",
    quote: "The international shipping options have opened up new markets for our business. TranspoEase makes it easy to reach customers worldwide.",
    image: "https://picsum.photos/50/50?random=9",
  },
  {
    name: "Ethan Davis",
    title: "Corporate Executive",
    quote: "For our urgent, same-day deliveries, TranspoEase is our go-to service. They are reliable, fast, and professional.",
    image: "https://picsum.photos/50/50?random=10",
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-muted">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Welcome to TranspoEase
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Your trusted partner for efficient and reliable parcel delivery services
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90">
                  Book a Delivery
                </Button>
              </Link>
              <Link href="/track">
                <Button variant="outline" size="lg" className="w-full md:w-auto">
                  Track Your Parcel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-xl border bg-card hover:border-primary transition-all duration-300">
              <div className="h-48 w-full mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=200&fit=crop" 
                  alt="Local Deliveries" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Local Deliveries</h3>
              <p className="text-muted-foreground">
                Fast and reliable local courier services to get your packages where they need to be, when they need to be there.
              </p>
            </div>
            <div className="group p-8 rounded-xl border bg-card hover:border-primary transition-all duration-300">
              <div className="h-48 w-full mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=200&fit=crop" 
                  alt="International Deliveries" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">International Deliveries</h3>
              <p className="text-muted-foreground">
                Seamless international shipping solutions with real-time tracking and customs support.
              </p>
            </div>
            <div className="group p-8 rounded-xl border bg-card hover:border-primary transition-all duration-300">
              <div className="h-48 w-full mb-6 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400&h=200&fit=crop" 
                  alt="Same-Day Service" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Same-Day Service</h3>
              <p className="text-muted-foreground">
                Need it there today? Our same-day delivery service ensures your urgent packages arrive on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose TranspoEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6 items-center p-8 rounded-xl bg-background border">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  We prioritize speed to ensure your packages arrive on time, every time.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center p-8 rounded-xl bg-background border">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Stay informed with up-to-the-minute tracking of your shipment's location and status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card hover:border-primary transition-all duration-300">
                <CardHeader className="flex flex-row items-center pb-2 space-y-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                  />
                  <div className="flex flex-col space-y-1">
                    <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{testimonial.title}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-md text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-[150px] bg-background"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
