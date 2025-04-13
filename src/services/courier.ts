/**
 * Represents an address with street, city, state, and zip code.
 */
export interface Address {
  /**
   * The street address.
   */
  street: string;
  /**
   * The city.
   */
  city: string;
  /**
   * The state.
   */
  state: string;
  /**
   * The zip code.
   */
  zip: string;
}

/**
 * Represents package details including size and weight.
 */
export interface PackageDetails {
  /**
   * The size of the package (e.g., small, medium, large).
   */
  size: string;
  /**
   * The weight of the package in kilograms.
   */
  weightKg: number;
}

/**
 * Represents a courier option with name, delivery time, and cost.
 */
export interface CourierOption {
  /**
   * The name of the courier service.
   */
  name: string;
  /**
   * The estimated delivery time in days.
   */
  deliveryTimeDays: number;
  /**
   * The cost of the courier service in USD.
   */
  costUSD: number;
}

/**
 * Asynchronously retrieves available courier options for given package details and pickup/delivery addresses.
 * @param packageDetails The details of the package.
 * @param pickupAddress The pickup address.
 * @param deliveryAddress The delivery address.
 * @returns A promise that resolves to an array of CourierOption objects.
 */
export async function getCourierOptions(
  packageDetails: PackageDetails,
  pickupAddress: Address,
  deliveryAddress: Address
): Promise<CourierOption[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Speedy Courier',
      deliveryTimeDays: 2,
      costUSD: 25.50,
    },
    {
      name: 'Reliable Delivery',
      deliveryTimeDays: 5,
      costUSD: 15.00,
    },
  ];
}

/**
 * Represents the status of a shipment.
 */
export type ShipmentStatus = 'Pending' | 'In Transit' | 'Delivered' | 'Delayed';

/**
 * Represents the tracking history of a shipment.
 */
export interface TrackingEvent {
  /**
   * The date and time of the tracking event.
   */
  timestamp: Date;
  /**
   * The location where the event occurred.
   */
  location: string;
  /**
   * A description of the event.
   */
  status: ShipmentStatus;
  description: string;
}

/**
 * Represents the tracking information for a shipment.
 */
export interface TrackingInfo {
  /**
   * The current status of the shipment.
   */
  status: ShipmentStatus;
  /**
   * The estimated delivery date.
   */
  estimatedDelivery: Date;
  /**
   * The history of tracking events for the shipment.
   */
  history: TrackingEvent[];
}

/**
 * Asynchronously retrieves tracking information for a given tracking ID.
 * @param trackingId The tracking ID of the shipment.
 * @returns A promise that resolves to a TrackingInfo object.
 */
export async function getTrackingInfo(trackingId: string): Promise<TrackingInfo> {
  // TODO: Implement this by calling an API.

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  return {
    status: 'In Transit',
    estimatedDelivery: new Date(2024, 8, 15),
    history: [
      {
        timestamp: now,
        location: 'New York',
        status: 'In Transit',
        description: 'Shipment is en route to destination.',
      },
      {
        timestamp: yesterday,
        location: 'Los Angeles',
        status: 'Pending',
        description: 'Shipment has been picked up.',
      },
    ],
  };
}
