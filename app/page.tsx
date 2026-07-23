import InvoicesClient from "@/components/InvoicesClient";
import { prisma } from "@/lib/prisma";
import { invoicesSchema } from "@/schemas/schemas";
export const dynamic = "force-dynamic";

export default async function Home() {
	const raw = await prisma.invoice.findMany({ include: { items: true } });
	const invoices = invoicesSchema.parse(raw);
	return (
		<div className="w-full min-h-dvh">
			<main className="grid max-w-6xl py-16 px-6 md:px-12 mx-auto">
				<InvoicesClient invoices={invoices} />
			</main>
		</div>
	);
}
