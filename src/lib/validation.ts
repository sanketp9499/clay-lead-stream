import { z } from 'zod';

export const SizeSchema = z.enum(['1-10', '11-50', '51-200', '201-500', '500+']);

export const FiltersSchema = z.object({
  keywords: z.array(z.string().min(1)).optional(),
  size: SizeSchema.optional(),
  hasInstagram: z.boolean().optional(),
  hasLinkedIn: z.boolean().optional(),
  hasPhone: z.boolean().optional(),
  limit: z.number().min(1).max(5000).optional().default(1000),
});

export type FiltersInput = z.infer<typeof FiltersSchema>;