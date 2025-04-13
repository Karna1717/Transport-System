'use server';
/**
 * @fileOverview This file defines a Genkit flow to suggest the best shipping options based on package details and destination.
 *
 * - suggestPackageOptions - A function that takes package details and addresses, then returns tailored courier recommendations.
 * - SuggestPackageOptionsInput - The input type for the suggestPackageOptions function.
 * - SuggestPackageOptionsOutput - The return type for the suggestPackageOptions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {Address, CourierOption, getCourierOptions, PackageDetails} from '@/services/courier';

const SuggestPackageOptionsInputSchema = z.object({
  packageDetails: z.object({
    size: z.string().describe('The size of the package (e.g., small, medium, large).'),
    weightKg: z.number().describe('The weight of the package in kilograms.'),
  }).describe('Details of the package, including size and weight.'),
  pickupAddress: z.object({
    street: z.string().describe('The street address for pickup.'),
    city: z.string().describe('The city for pickup.'),
    state: z.string().describe('The state for pickup.'),
    zip: z.string().describe('The zip code for pickup.'),
  }).describe('The full pickup address.'),
  deliveryAddress: z.object({
    street: z.string().describe('The street address for delivery.'),
    city: z.string().describe('The city for delivery.'),
    state: z.string().describe('The state for delivery.'),
    zip: z.string().describe('The zip code for delivery.'),
  }).describe('The full delivery address.'),
});
export type SuggestPackageOptionsInput = z.infer<typeof SuggestPackageOptionsInputSchema>;

const SuggestPackageOptionsOutputSchema = z.array(z.object({
  name: z.string().describe('The name of the courier service.'),
  deliveryTimeDays: z.number().describe('The estimated delivery time in days.'),
  costUSD: z.number().describe('The cost of the courier service in USD.'),
  recommendationReason: z.string().describe('The reason why this option is recommended for the user, with respect to price and delivery time.'),
}));
export type SuggestPackageOptionsOutput = z.infer<typeof SuggestPackageOptionsOutputSchema>;

export async function suggestPackageOptions(input: SuggestPackageOptionsInput): Promise<SuggestPackageOptionsOutput> {
  return suggestPackageOptionsFlow(input);
}

const suggestPackageOptionsPrompt = ai.definePrompt({
  name: 'suggestPackageOptionsPrompt',
  input: {
    schema: z.object({
      packageDetails: z.object({
        size: z.string().describe('The size of the package (e.g., small, medium, large).'),
        weightKg: z.number().describe('The weight of the package in kilograms.'),
      }).describe('Details of the package, including size and weight.'),
      pickupAddress: z.object({
        street: z.string().describe('The street address for pickup.'),
        city: z.string().describe('The city for pickup.'),
        state: z.string().describe('The state for pickup.'),
        zip: z.string().describe('The zip code for pickup.'),
      }).describe('The full pickup address.'),
      deliveryAddress: z.object({
        street: z.string().describe('The street address for delivery.'),
        city: z.string().describe('The city for delivery.'),
        state: z.string().describe('The state for delivery.'),
        zip: z.string().describe('The zip code for delivery.'),
      }).describe('The full delivery address.'),
      courierOptions: z.array(z.object({
        name: z.string().describe('The name of the courier service.'),
        deliveryTimeDays: z.number().describe('The estimated delivery time in days.'),
        costUSD: z.number().describe('The cost of the courier service in USD.'),
      })).describe('The available courier options.'),
    }),
  },
  output: {
    schema: z.array(z.object({
      name: z.string().describe('The name of the courier service.'),
      deliveryTimeDays: z.number().describe('The estimated delivery time in days.'),
      costUSD: z.number().describe('The cost of the courier service in USD.'),
      recommendationReason: z.string().describe('The reason why this option is recommended for the user, with respect to price and delivery time.'),
    })),
  },
  prompt: `Given the following package details, pickup address, delivery address, and courier options, provide a recommendation reason for each courier option, considering both price and delivery time.
Package Details:
Size: {{{packageDetails.size}}}
Weight: {{{packageDetails.weightKg}}} kg

Pickup Address:
Street: {{{pickupAddress.street}}}
City: {{{pickupAddress.city}}}
State: {{{pickupAddress.state}}}
Zip: {{{pickupAddress.zip}}}

Delivery Address:
Street: {{{deliveryAddress.street}}}
City: {{{deliveryAddress.city}}}
State: {{{deliveryAddress.state}}}
Zip: {{{deliveryAddress.zip}}}

Courier Options:
{{#each courierOptions}}
- Name: {{{name}}}, Delivery Time: {{{deliveryTimeDays}}} days, Cost: \${{{costUSD}}}
{{/each}}

For each courier option, provide a recommendation reason that explains why this option might be suitable for the user, considering both price and delivery time. Be concise and specific.`,
});

const suggestPackageOptionsFlow = ai.defineFlow<
  typeof SuggestPackageOptionsInputSchema,
  typeof SuggestPackageOptionsOutputSchema
>({
  name: 'suggestPackageOptionsFlow',
  inputSchema: SuggestPackageOptionsInputSchema,
  outputSchema: SuggestPackageOptionsOutputSchema,
}, async input => {
  const courierOptions = await getCourierOptions(
    input.packageDetails,
    input.pickupAddress,
    input.deliveryAddress
  );

  const promptInput = {
    ...input,
    courierOptions,
  };

  const {output} = await suggestPackageOptionsPrompt(promptInput);
  return output!;
});
