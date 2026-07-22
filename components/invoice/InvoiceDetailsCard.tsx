import React from "react";
import InvoiceHeader from "./invoice-details/InvoiceHeader";
import InvoiceInfo from "./invoice-details/InvoiceInfo";
import InvoiceAddress from "./invoice-details/InvoiceAddress";
import { Invoice } from "@/schemas/schemas";
import InvoiceTable from "./invoice-details/InvoiceTable";

type Props = {
	invoice: Invoice;
};

function InvoiceDetailsCard({ invoice }: Props) {
	return (
		<div className="grid gap-8 bg-card border rounded-lg border-border p-6 sm:p-12">
			<InvoiceHeader
				id={invoice.id}
				description={invoice.description}
				senderAddress={invoice.senderAddress}
			/>
			<div className="grid md:grid-cols-3 grid-cols-2 gap-y-8 gap-x-4">
				<InvoiceInfo
					label="Invoice Date"
					content={invoice.createdAt}
					className="col-start-1 row-start-1"
				/>
				<InvoiceInfo
					label="Payment Due"
					content={invoice.paymentDue}
					className="col-start-1 row-start-2"
				/>
				<InvoiceInfo
					label="Bill To"
					content={invoice.clientName}
					className="col-start-2 row-start-1 md:row-start-1">
					<InvoiceAddress address={invoice.clientAddress} />
				</InvoiceInfo>
				<InvoiceInfo
					label="Sent to"
					content={invoice.clientEmail}
					className="col-start-1 row-start-3 md:col-start-3 md:row-start-1"
				/>
			</div>
			<InvoiceTable invoiceData={invoice} />
		</div>
	);
}

export default InvoiceDetailsCard;
