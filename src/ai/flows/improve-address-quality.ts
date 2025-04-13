'use server';
/**
 * @fileOverview Validates and improves address quality using GenAI to ensure deliverability and avoid errors.
 *
 * - improveAddressQuality - A function that handles the address validation and improvement process.
 * - ImproveAddressQualityInput - The input type for the improveAddressQuality function.
 * - ImproveAddressQualityOutput - The return type for the improveAddressQuality function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ImproveAddressQualityInputSchema = z.object({
  address: z.string().describe('The address to validate and improve.'),
});
export type ImproveAddressQualityInput = z.infer<typeof ImproveAddressQualityInputSchema>;

const ImproveAddressQualityOutputSchema = z.object({
  improvedAddress: z.string().describe('The validated and improved address.'),
  correctionsMade: z
    .string()
    .describe('A summary of the corrections and improvements made to the address.'),
});
export type ImproveAddressQualityOutput = z.infer<typeof ImproveAddressQualityOutputSchema>;

export async function improveAddressQuality(input: ImproveAddressQualityInput): Promise<ImproveAddressQualityOutput> {
  return improveAddressQualityFlow(input);
}

const improveAddressQualityPrompt = ai.definePrompt({
  name: 'improveAddressQualityPrompt',
  input: {
    schema: z.object({
      address: z.string().describe('The address to validate and improve.'),
    }),
  },
  output: {
    schema: z.object({
      improvedAddress: z.string().describe('The validated and improved address.'),
      correctionsMade:
        z.string().describe('A summary of the corrections and improvements made to the address.'),
    }),
  },
  prompt: `You are an AI assistant specialized in address validation and improvement.

You will receive an address as input. Your task is to validate the address, correct any misspellings,
complete any partial information, and standardize the address format. You should also summarize the changes.

Address to improve: {{{address}}}

Output the improved address and a summary of the corrections made.
`,
});

const improveAddressQualityFlow = ai.defineFlow<
  typeof ImproveAddressQualityInputSchema,
  typeof ImproveAddressQualityOutputSchema
>(
  {
    name: 'improveAddressQualityFlow',
    inputSchema: ImproveAddressQualityInputSchema,
    outputSchema: ImproveAddressQualityOutputSchema,
  },
  async input => {
    const {output} = await improveAddressQualityPrompt(input);
    return output!;
  }
);
