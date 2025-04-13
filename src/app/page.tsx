
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <section className="hero-section text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Book Your Courier Instantly!</h1>
        <p className="text-lg text-muted-foreground">
          Simplify your shipping process with TranspoEase. Fast, reliable, and affordable courier services at your fingertips.
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/book">
            <Button className="bg-accent text-background hover:bg-accent-foreground">Book Now</Button>
          </Link>
          <Link href="/track">
            <Button variant="secondary">Track Parcel</Button>
          </Link>
        </div>
      </section>

      <section className="services-overview mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Local Deliveries</h3>
            <p className="text-muted-foreground">
              Fast and reliable local courier services to get your packages where they need to be, when they need to be there.
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">International Deliveries</h3>
            <p className="text-muted-foreground">
              Seamless international shipping solutions with real-time tracking and customs support.
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Same-Day Service</h3>
            <p className="text-muted-foreground">
              Need it there today? Our same-day delivery service ensures your urgent packages arrive on time.
            </p>
          </div>
        </div>
      </section>

      <section className="features-highlight">
        <h2 className="text-2xl font-semibold mb-4">Why Choose TranspoEase?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              We prioritize speed to ensure your packages arrive on time, every time.
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Stay informed with up-to-the-minute tracking of your shipment's location and status.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


    