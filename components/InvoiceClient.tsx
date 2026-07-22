'use client'
import InvoiceDetailsCard from "@/components/invoice/InvoiceDetailsCard";
import InvoiceStatusHeader from "@/components/invoice/InvoiceStatusHeader";
import { invoicesSchema } from "@/schemas/schemas";
import { notFound } from "next/navigation";
import InvoiceForm from "@/components/InvoiceForm";
import { useState } from "react";
import { editInvoice } from "@/actions/services";

type Props = {
    slug: string;
    rawData: string;
}

function InvoiceClient({slug, rawData}:Props) {
    const [isOpen, setIsOpen] = useState(false)
	const invoices = invoicesSchema.parse(JSON.parse(rawData));
	const invoice = invoices.find((item) => item.id === slug);
	if (!invoice) return notFound();
    const filledValues = {
		createdAt: invoice.createdAt,
		paymentTerms: invoice.paymentTerms,
		items: invoice.items,
		senderAddress: invoice.senderAddress,
		clientAddress: invoice.clientAddress,
		clientEmail: invoice.clientEmail,
		clientName: invoice.clientName,
		paymentDue: invoice.paymentDue,
		description: invoice.description,
	}; 
	return (
		<div className="grid gap-8">
			<InvoiceStatusHeader status={invoice.status} onClick={() => setIsOpen(true)} id={invoice.id}/>
			<InvoiceDetailsCard invoice={invoice} />
			<InvoiceForm
				mode={"edit"}
				defaultValues={filledValues}
				isOpen={isOpen}
				setIsOpen={() => setIsOpen(false)}
				action={(invoice) => editInvoice(slug, invoice)}
			/>
		</div>
	);
}

export default InvoiceClient;
