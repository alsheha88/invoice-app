import InvoicesClient from "@/components/InvoicesClient";
import data from '@/lib/data.json'
import { InvoicesData, invoicesSchema } from "@/schemas/schemas";


export default async function Home() {
	const invoices:InvoicesData = invoicesSchema.parse(data);
	return (
		<div className="w-full min-h-dvh">
			<main className="grid max-w-6xl py-16 px-6 md:px-12 mx-auto">
				<InvoicesClient invoices={invoices} />
				
			</main>
		</div>
	);
}
