import { z } from "zod";

export type InvoiceData = {
	name: string;
	price: number;
	quantity: number;
	total: number;
}[];

export const addressSchema = z.object({
	street: z.string(),
	city: z.string(),
	postCode: z.string(),
	country: z.string(),
});

export const invoiceSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	paymentDue: z.string(),
	description: z.string(),
	paymentTerms: z.number(),
	clientName: z.string(),
	clientEmail: z.union([z.email(), z.literal("")]),
	status: z.enum(["paid", "pending", "draft"]),
	senderAddress: addressSchema,
	clientAddress: addressSchema,
	items: z.array(
		z.object({
			name: z.string(),
			price: z.number(),
			quantity: z.number(),
			total: z.number(),
		}),
	),
	total: z.number(),
});

const strictAddress = z.object({
	street: z.string().min(1),
	city: z.string().min(1),
	postCode: z.string().min(1),
	country: z.string().min(1),
});

const itemInputSchema = z.object({
	name: z.string().min(1),
	quantity: z.number().min(1),
	price: z.number().min(0),
});

export const sendSchema = z.object({
	senderAddress: strictAddress,
	createdAt: z.string(),

	clientName: z.string().min(1),
	clientEmail: z.email(),
	clientAddress: strictAddress,
	paymentDue: z.string().min(1),
	paymentTerms: z.number(),
	description: z.string().min(1),
	items: z.array(itemInputSchema).min(1),
});

export const draftSchema = z.object({
	senderAddress: addressSchema,
	createdAt: z.string(),
	clientName: z.string(),
	clientEmail: z.union([z.email(), z.literal("")]),
	clientAddress: addressSchema,
	paymentDue: z.string(),
	paymentTerms: z.number(),
	description: z.string(),
	items: z.array(
		z.object({
			name: z.string(),
			quantity: z.number(),
			price: z.number(),
		}),
	),
});

export type NewInvoiceInput = z.infer<typeof sendSchema>;
export type EditInvoiceInput = z.infer<typeof draftSchema>;
export const invoicesSchema = z.array(invoiceSchema);

export type Invoice = z.infer<typeof invoiceSchema>;
export type Address = z.infer<typeof addressSchema>;
export type InvoicesData = z.infer<typeof invoicesSchema>;
