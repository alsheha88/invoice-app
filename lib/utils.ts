import { NewInvoiceInput } from "@/schemas/schemas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const generateId = () => {
	return (
		Array.from({ length: 2 }, () =>
			String.fromCharCode(65 + Math.floor(Math.random() * 26)),
		).join("") +
		Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("")
	);
};

export const getPaymentDue = (invoiceDate: string, paymentTerm: number) => {
	const due =
		new Date(invoiceDate).getTime() + paymentTerm * 24 * 60 * 60 * 1000;
	return new Date(due).toISOString().split("T")[0];
};

export const buildInvoice = (
	input: NewInvoiceInput,
	status: "pending" | "draft",
) => {
	const items = input.items.map((item) => {
		return {
			...item,
			total: item.price * item.quantity,
		};
	});
	return {
		...input,
		items,
		id: generateId(),
		createdAt: input.createdAt,
		paymentDue: getPaymentDue(input.createdAt, input.paymentTerms),
		status,
		total: items.reduce((acc, i) => (acc += i.total), 0),
	};
};

export const formatAmount = (amount: number) => {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(amount);
};
