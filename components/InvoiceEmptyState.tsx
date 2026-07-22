import Image from "next/image";
import noInvoice from "@/public/assets/illustration-empty.svg";

function InvoiceEmptyState() {
	return (
		<div className="grid place-items-center gap-16 mt-32">
			<Image src={noInvoice} alt="No invoices" />

			<div className="flex flex-col gap-6">
				<h2 className="text-2xl text-foreground font-bold">
					There is nothing here
				</h2>
				<div className="flex flex-col gap-0.5">
					<p className="text-[0.8125rem] text-tertiary-foreground font-medium">
						Create a new invoice by clicking the
					</p>
					<p className="text-[0.8125rem] text-tertiary-foreground font-medium">
						New Invoice button and get started
					</p>
				</div>
			</div>
		</div>
	);
}

export default InvoiceEmptyState;
