"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto py-10 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <div className="w-full md:w-1/2 mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium leading-none mb-1">
              Username
            </label>
            <Input type="text" placeholder="Enter your username" />
          </div>
          <div>
            <label className="block text-sm font-medium leading-none mb-1">
              Email
            </label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium leading-none mb-1">
              Password
            </label>
            <Input type="password" placeholder="Enter your password" />
          </div>
        </div>
        <Button className="w-full mt-6 bg-primary text-background hover:bg-primary-foreground transition-colors duration-300">
          Sign Up
        </Button>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
