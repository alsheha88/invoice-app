"use server";
import { buildInvoice } from "@/lib/utils";
import {
	EditInvoiceInput,
	invoiceSchema,
	NewInvoiceInput,
} from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const addInvoice = async (
	invoice: NewInvoiceInput,
	status: "pending" | "draft",
) => {
	console.log("ACTION CALLED", invoice);
	const builtInvoice = buildInvoice(invoice, status);
	const validated = invoiceSchema.safeParse(builtInvoice);
	if (!validated.success) throw new Error("Failed to build valid invoice");
	await prisma.invoice.create({
		data: {
			id: builtInvoice.id,
			clientName: builtInvoice.clientName,
			clientEmail: builtInvoice.clientEmail,
			senderAddress: builtInvoice.senderAddress,
			clientAddress: builtInvoice.clientAddress,
			createdAt: builtInvoice.createdAt,
			status: builtInvoice.status,
			paymentDue: builtInvoice.paymentDue,
			paymentTerms: builtInvoice.paymentTerms,
			description: builtInvoice.description,
			items: {
				create: builtInvoice.items.map((i) => ({
					name: i.name,
					price: i.price,
					quantity: i.quantity,
					total: i.total,
				})),
			},
			total: builtInvoice.total,
		},
	});

	revalidatePath("/");
};

export const editInvoice = async (id: string, invoice: EditInvoiceInput) => {
	const rebuilt = buildInvoice(invoice, "pending");
	const validated = invoiceSchema.safeParse(rebuilt);
	if (!validated.success) throw new Error("Failed to edit invoice");
	const existing = await prisma.invoice.findUnique({
		where: {
			id: id
		}
	});
	if (!existing) throw new Error("Invoice not found");

	await prisma.invoice.update({
		where: {
			id: id
		},
		data: {
			clientName: validated.data.clientName,
			clientEmail: validated.data.clientEmail,
			senderAddress: validated.data.senderAddress,
			clientAddress: validated.data.clientAddress,
			createdAt: existing.createdAt,
			status: validated.data.status,
			paymentDue: validated.data.paymentDue,
			paymentTerms: validated.data.paymentTerms,
			description: validated.data.description,
			items: {
				deleteMany: {},
				create: validated.data.items.map((i) => ({
					name: i.name,
					price: i.price,
					quantity: i.quantity,
					total: i.total,
				})),
			},
			total: validated.data.total,
			
		},
	})

	revalidatePath("/");
	revalidatePath(`/invoice/${id}`);
};

export const deleteInvoice = async (id: string) => {
	await prisma.invoice.delete({ where: { id } });
	revalidatePath("/");
	redirect("/");
};

export const markAsPaid = async (id: string) => {
	await prisma.invoice.update({
		where: { id },
		data: { status: "paid" },
	});
	revalidatePath("/");
	revalidatePath(`/invoice/${id}`);
};
