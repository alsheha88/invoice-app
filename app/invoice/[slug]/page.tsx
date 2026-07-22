import { invoicesSchema } from "@/schemas/schemas";
import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import InvoiceClient from "@/components/InvoiceClient";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const filePath = path.join(process.cwd(), "lib", "data.json");
	const rawData = await readFile(filePath, "utf-8");
	const invoices = invoicesSchema.parse(JSON.parse(rawData));
	const invoice = invoices.find((item) => item.id === slug);
	if (!invoice) return notFound();
	return (
		<div className="flex flex-col gap-4 mx-auto w-[min(60rem,100%)]  py-16 px-6 md:px-12">
			<Link href={"/"} className="flex items-center font-bold gap-2"><ChevronLeft width={20} height={20} className="text-primary" /> Go back</Link>
			<InvoiceClient slug={slug} rawData={rawData} />
			
		</div>
	);
}
