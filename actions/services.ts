"use server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { buildInvoice } from "@/lib/utils";
import {
	EditInvoiceInput,
	invoiceSchema,
	invoicesSchema,
	NewInvoiceInput,
} from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addInvoice = async (
	invoice: NewInvoiceInput,
	status: "pending" | "draft",
) => {
	const filePath = path.join(process.cwd(), "lib", "data.json");
	const rawData = await readFile(filePath, "utf-8");
	const newInvoice = buildInvoice(invoice, status);
	const validated = invoiceSchema.safeParse(newInvoice);
	if (!validated.success) throw new Error("Failed to build valid invoice");
	const result = invoicesSchema.safeParse(JSON.parse(rawData));
	if (!result.success) throw new Error("Invalid invoice data");
	const invoices = result.data;
	const newInvoices = [...invoices, validated.data];

	await writeFile(filePath, JSON.stringify(newInvoices, null, 2), "utf-8");

	revalidatePath("/");
};

export const editInvoice = async (id: string, invoice: EditInvoiceInput) => {
	const filePath = path.join(process.cwd(), "lib", "data.json");
	const rawData = await readFile(filePath, "utf-8");
	const result = invoicesSchema.safeParse(JSON.parse(rawData));
	if (!result.success) throw new Error("Can`t find invoice data");
	const invoices = result.data;
	const existing = invoices.find((i) => i.id === id);
	if (!existing) throw new Error("Invoice not found");

	const rebuilt = buildInvoice(invoice, "pending");
	const edited = { ...rebuilt, id, createdAt: existing.createdAt };

	const validated = invoiceSchema.safeParse(edited);
	if (!validated.success) throw new Error("Failed to edit invoice");

	const mutatedInvoices = invoices.map((item) =>
		item.id === id ? validated.data : item,
	);
	await writeFile(filePath, JSON.stringify(mutatedInvoices, null, 2), "utf-8");

	revalidatePath("/");
	revalidatePath(`/invoice/${id}`);
};

export const markAsPaid = async (id: string) => {
	const filePath = path.join(process.cwd(), "lib", "data.json");
	const rawData = await readFile(filePath, "utf-8");
	const result = invoicesSchema.safeParse(JSON.parse(rawData));
	if (!result.success) throw new Error("Can`t find invoice data");
	const targetInvoice = result.data.find((inv) => inv.id === id);
	if (!targetInvoice) throw new Error("Invoice not found");
	const edited = { ...targetInvoice, status: "paid" as const };

	const mutatedInvoices = result.data.map((item) =>
		item.id === id ? edited : item,
	);
	await writeFile(filePath, JSON.stringify(mutatedInvoices, null, 2), "utf-8");

	revalidatePath("/");
	revalidatePath(`/invoice/${id}`);
};
export const deleteInvoice = async (id: string) => {
	const filePath = path.join(process.cwd(), "lib", "data.json");
	const rawData = await readFile(filePath, "utf-8");
	const result = invoicesSchema.safeParse(JSON.parse(rawData));
	if (!result.success) throw new Error("Can`t find invoice data");

	const updatedInvoices = result.data.filter((inv) => inv.id !== id);
	await writeFile(filePath, JSON.stringify(updatedInvoices, null, 2), "utf-8");

	revalidatePath("/");
	redirect("/");
};
