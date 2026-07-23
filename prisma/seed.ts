import { prisma } from "@/lib/prisma";
import data from "@/lib/data.json" with { type: "json" };
import { Status } from "@/generated/prisma/enums";

async function main() {
	const invoices = data;
	if (invoices.length === 0)
		throw new Error("Seed data must contain at least one invoice");

	for (const inv of invoices) {
		await prisma.invoice.create({
			data: {
				id: inv.id,
				clientName: inv.clientName,
				clientEmail: inv.clientEmail,
				senderAddress: inv.senderAddress,
				clientAddress: inv.clientAddress,
				createdAt: inv.createdAt,
				status: inv.status as Status,
				paymentDue: inv.paymentDue,
				paymentTerms: inv.paymentTerms,
				description: inv.description,
				items: {
					create: inv.items.map((i) => ({
						name: i.name,
						price: i.price,
						quantity: i.quantity,
						total: i.total,
					})),
				},
				total: inv.total,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
