"use client";
import { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import PageHeader from "./PageHeader";
import InvoiceLink from "./invoice/invoice-details/InvoiceLink";
import { InvoicesData, NewInvoiceInput } from "@/schemas/schemas";
import InvoiceEmptyState from "./InvoiceEmptyState";
import { addInvoice } from "@/actions/services";

type Props = {
	invoices: InvoicesData;
};

function InvoicesClient({ invoices }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const emptyValues = {
		createdAt: new Date().toISOString().split("T")[0],
		paymentTerms: 30,
		items: [{ name: "", quantity: 1, price: 0 }],
		senderAddress: { street: "", city: "", postCode: "", country: "" },
		clientAddress: { street: "", city: "", postCode: "", country: "" },
		clientEmail: "",
		clientName: "",
		paymentDue: "",
		description: "",
	};

	return (
		<div className="flex flex-col gap-12 min-h-dvh">
			<PageHeader
				invoicesLength={invoices.length}
				onNewInvoice={() => setIsOpen(true)}
			/>
			{invoices.length === 0 ? (
				<InvoiceEmptyState />
			) : (
				<div className="grid gap-4">
					{invoices.map((item) => (
						<InvoiceLink
							key={item.id}
							id={item.id}
							dueDate={item.paymentDue}
							client={item.clientName}
							amount={item.total}
							status={item.status}
						/>
					))}
				</div>
			)}
			<InvoiceForm
				mode="add"
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				defaultValues={emptyValues}
				action={addInvoice}
			/>
		</div>
	);
}

export default InvoicesClient;
