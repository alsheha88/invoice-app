import StatusPill from "../ui/StatusPill";
import { Button } from "../ui/Button";
import { deleteInvoice, markAsPaid } from "@/actions/services";
import { Dispatch, SetStateAction } from "react";

type Props = {
	status: "paid" | "pending" | "draft";
	onClick: () => void;
	id: string;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function InvoiceStatusHeader({ status, onClick, id, setIsModalOpen }: Props) {
	return (
		<div className="flex items-center justify-between bg-card px-8 py-5 border border-border shadow-row rounded-lg">
			<div className="w-full sm:w-auto flex items-center sm:justify-start justify-between gap-5">
				<p className="text-[0.8125rem] text-tertiary-foreground">Status</p>
				<StatusPill status={status} />
			</div>
			<div className="sm:w-auto w-full flex items-center justify-center gap-2 sm:relative fixed bottom-0 left-0 sm:bg-transparent bg-card sm:p-0 p-6 shadow-row sm:shadow-none">
				<Button variant={"secondary"} className="flex-1" onClick={onClick}>
					Edit
				</Button>
				<Button variant={"destructive"} className="flex-1" onClick={() => setIsModalOpen(true)}>
					Delete
				</Button>
				<Button variant={"primary"} className="flex-1 min-w-max disabled:pointer-events-none" disabled={status === "paid" || status === "draft"} onClick={() => markAsPaid(id)}>
					Mark as Paid
				</Button>
			</div>
		</div>
	);
}

export default InvoiceStatusHeader;
