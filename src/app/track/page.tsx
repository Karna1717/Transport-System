"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackingInfo, getTrackingInfo } from "@/services/courier";

export default function TrackParcelPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    setIsLoading(true);
    try {
      const info = await getTrackingInfo(trackingId);
      setTrackingInfo(info);
    } catch (error) {
      console.error("Failed to fetch tracking info", error);
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Parcel</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Enter your tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full md:w-auto shadow-sm"
        />
        <Button onClick={handleTrack} disabled={isLoading} className="bg-primary text-background hover:bg-primary-foreground transition-colors duration-300 shadow-md">
          {isLoading ? "Loading..." : "Track"}
        </Button>
      </div>

      {trackingInfo && (
        <Card className="w-full md:w-3/4 mx-auto">
          <CardHeader>
            <CardTitle>Tracking Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Status:</strong> {trackingInfo.status}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery.toLocaleDateString()}
            </p>
            <h3 className="text-xl font-semibold mt-4">Tracking History</h3>
            <ul className="list-disc pl-5">
              {trackingInfo.history.map((event, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <strong>Date:</strong> {event.timestamp.toLocaleDateString()} {event.timestamp.toLocaleTimeString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {event.status}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {!trackingInfo && !isLoading && trackingId.length > 0 && (
        <div className="text-center mt-4 text-muted-foreground">
          No tracking information found for ID: {trackingId}
        </div>
      )}
    </div>
  );
}
