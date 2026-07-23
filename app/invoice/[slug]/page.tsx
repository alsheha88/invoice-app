import { invoicesSchema } from "@/schemas/schemas";
import { notFound } from "next/navigation";
import InvoiceClient from "@/components/InvoiceClient";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Modal from "@/components/ui/Modal";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const raw = await prisma.invoice.findMany({ include: { items: true } });
	const invoices = invoicesSchema.parse(raw);
	const invoice = await prisma.invoice.findUnique({
		where: {id: slug}
	});
	if (!invoice) return notFound();
	return (
		<div className="flex flex-col gap-4 mx-auto w-[min(60rem,100%)]  py-16 px-6 md:px-12">
			<Link href={"/"} className="flex items-center font-bold gap-2"><ChevronLeft width={20} height={20} className="text-primary" /> Go back</Link>
			<InvoiceClient slug={slug} rawData={invoices} />
			
		</div>
	);
}
