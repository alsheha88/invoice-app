"use client";
import { useState } from "react";
import InvoiceForm from "./InvoiceForm";
import PageHeader from "./PageHeader";
import InvoiceLink from "./invoice/invoice-details/InvoiceLink";
import { InvoicesData, Status } from "@/schemas/schemas";
import InvoiceEmptyState from "./InvoiceEmptyState";
import { addInvoice } from "@/actions/services";
import InvoiceFilterDropdown from "./InvoiceFilterDropdown";

type Props = {
	invoices: InvoicesData;
};

function InvoicesClient({ invoices }: Props) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<Status[]>([]);
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
	const filteredInvoices = invoices.filter(
		(inv) => selectedStatus.length === 0 || selectedStatus.includes(inv.status),
	);
	return (
		<div className="flex flex-col gap-12 min-h-dvh">
			<PageHeader
				invoicesLength={invoices.length}
				onNewInvoice={() => setIsFormOpen(true)}
				isDropdownOpen={isDropdownOpen}
				setIsDropdownOpen={setIsDropdownOpen}>
				<InvoiceFilterDropdown
					isOpen={isDropdownOpen}
					selected={selectedStatus}
					setSelected={setSelectedStatus}
				/>
			</PageHeader>

			{invoices.length === 0 ? (
				<InvoiceEmptyState />
			) : (
				<div className="grid gap-4">
					{filteredInvoices.map((item) => (
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
				isOpen={isFormOpen}
				setIsOpen={setIsFormOpen}
				defaultValues={emptyValues}
				action={addInvoice}
			/>
		</div>
	);
}

export default InvoicesClient;