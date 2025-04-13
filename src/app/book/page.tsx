"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Address, PackageDetails, CourierOption } from "@/services/courier";
import { getCourierOptions } from "@/services/courier";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {suggestPackageOptions, SuggestPackageOptionsInput, SuggestPackageOptionsOutput} from '@/ai/flows/suggest-package-options';

const packageDetailsSchema = z.object({
  size: z.string().min(2, {
    message: "Package size must be at least 2 characters.",
  }),
  weightKg: z.number().min(0.1, {
    message: "Weight must be greater than 0.",
  }),
});

const addressSchema = z.object({
  street: z.string().min(5, {
    message: "Street address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().regex(/^\d{5}(?:-\d{4})?$/, {
    message: "Invalid zip code format.",
  }),
});

const bookShipmentSchema = z.object({
  packageDetails: packageDetailsSchema,
  pickupAddress: addressSchema,
  deliveryAddress: addressSchema,
});

type BookShipmentValues = z.infer<typeof bookShipmentSchema>;

export default function BookShipmentPage() {
  const [courierOptions, setCourierOptions] = useState<SuggestPackageOptionsOutput>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookShipmentValues>({
    resolver: zodResolver(bookShipmentSchema),
    defaultValues: {
      packageDetails: {
        size: "",
        weightKg: 1,
      },
      pickupAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      deliveryAddress: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
  });

  async function onSubmit(values: BookShipmentValues) {
    setIsLoading(true);
    try {
      const input: SuggestPackageOptionsInput = {
        packageDetails: values.packageDetails,
        pickupAddress: values.pickupAddress,
        deliveryAddress: values.deliveryAddress,
      };
      const options = await suggestPackageOptions(input);
      setCourierOptions(options);
    } catch (error) {
      console.error("Failed to fetch courier options", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Shipment</h1>

      <Card className="w-full md:w-3/4 mx-auto">
        <CardHeader>
          <CardTitle>Enter Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Package Details</h2>
                <FormField
                  control={form.control}
                  name="packageDetails.size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Medium" {...field} />
                      </FormControl>
                      <FormDescription>Enter the size of the package.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packageDetails.weightKg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="e.g., 1.5"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter the weight of the package in kilograms.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Pickup Address</h2>
                <FormField
                  control={form.control}
                  name="pickupAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickupAddress.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
                <FormField
                  control={form.control}
                  name="deliveryAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="456 Elm St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Los Angeles" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryAddress.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="90001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="bg-primary text-background hover:bg-primary-foreground transition-colors duration-300">
                {isLoading ? "Loading..." : "Get Courier Options"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {courierOptions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Available Courier Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courierOptions.map((option) => (
              <Card key={option.name} className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardTitle className="text-xl font-semibold mb-2">{option.name}</CardTitle>
                <CardContent className="space-y-1">
                  <p className="text-muted-foreground">Delivery Time: {option.deliveryTimeDays} days</p>
                  <p className="text-muted-foreground">Cost: ${option.costUSD}</p>
                  <p className="text-muted-foreground">Recommendation Reason: {option.recommendationReason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
