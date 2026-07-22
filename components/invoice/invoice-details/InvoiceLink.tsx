import { ChevronRight } from "lucide-react";
import Link from "next/link";
import StatusPill from "@/components/ui/StatusPill";

type Props = {
	id: string;
	dueDate: string;
	client: string;
	amount: number;
	status: "paid" | "pending" | "draft";
};

function InvoiceLink({ id, dueDate, client, amount, status }: Props) {
	return (
		<Link
			href={`invoice/${id}`}
			className="grid invoice-row items-center sm:text-center px-8 py-4 rounded-lg border border-border bg-card shadow-row focus-visible:outline-primary">
			<p className="text-foreground font-bold text-start id">
				<span className="text-secondary-foreground">#</span>
				{id}
			</p>
			<p className="w-max text-[0.8125rem] tracking-wider text-secondary-foreground font-medium due">
				Due {dueDate}
			</p>
			<p className="w-max justify-self-end text-sm text-secondary-foreground font-medium client">
				{client}
			</p>
			<p className="text-foreground font-bold amount">£ {amount}</p>
			<div className="[grid-area:status]">
				<StatusPill status={status} />
			</div>
			<ChevronRight className="stroke-primary justify-self-end chevron sm:block hidden" />
		</Link>
	);
}

export default InvoiceLink;
