"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="container mx-auto py-10 fade-in">
      <section className="hero-section text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {loading ? "Loading..." : "Book Your Courier Instantly!"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {loading
            ? "Loading services..."
            : "Simplify your shipping process with TranspoEase. Fast, reliable, and affordable courier services at your fingertips."}
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/book">
            <Button className="bg-accent text-background hover:bg-accent-foreground transition-colors duration-300">
              Book Now
            </Button>
          </Link>
          <Link href="/track">
            <Button variant="secondary" className="transition-colors duration-300">
              Track Parcel
            </Button>
          </Link>
        </div>
      </section>

      <section className="services-overview mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Local Deliveries</h3>
            <p className="text-muted-foreground">
              Fast and reliable local courier services to get your packages where they need to be, when they need to be there.
            </p>
            <img src="https://picsum.photos/400/200?random=3" alt="Local Deliveries" className="mt-4 rounded-md" />
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">International Deliveries</h3>
            <p className="text-muted-foreground">
              Seamless international shipping solutions with real-time tracking and customs support.
            </p>
            <img src="https://picsum.photos/400/200?random=4" alt="International Deliveries" className="mt-4 rounded-md" />
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Same-Day Service</h3>
            <p className="text-muted-foreground">
              Need it there today? Our same-day delivery service ensures your urgent packages arrive on time.
            </p>
            <img src="https://picsum.photos/400/200?random=5" alt="Same-Day Service" className="mt-4 rounded-md" />
          </div>
        </div>
      </section>

      <section className="features-highlight mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose TranspoEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              We prioritize speed to ensure your packages arrive on time, every time.
            </p>
            <img src="https://picsum.photos/400/200?random=6" alt="Fast Delivery" className="mt-4 rounded-md" />
          </div>
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Stay informed with up-to-the-minute tracking of your shipment's location and status.
            </p>
            <img src="https://picsum.photos/400/200?random=7" alt="Real-Time Tracking" className="mt-4 rounded-md" />
          </div>
        </div>
      </section>

      <section className="testimonials mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center pb-2 space-y-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-4"
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
      </section>
    </div>
  );
}
