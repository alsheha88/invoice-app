"use client";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Dispatch, SetStateAction } from "react";

type Props = {
	invoicesLength: number;
	onNewInvoice: () => void;
	children: React.ReactNode;
	setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
	isDropdownOpen: boolean;
};

function PageHeader({
	invoicesLength,
	onNewInvoice,
	isDropdownOpen,
	setIsDropdownOpen,
	children,
}: Props) {
	return (
		<div className="min-w-80 w-full flex items-center justify-between">
			<div className="sm:flex-1 flex flex-col gap-1.5">
				<h1 className="text-2xl sm:text-4xl text-foreground font-bold">
					Invoices
				</h1>
				<p className="text-[0.8125rem] text-tertiary-foreground">
					{invoicesLength < 1
						? "No invoices"
						: `There are ${invoicesLength} total invoices`}
				</p>
			</div>
			<div className="flex items-center sm:gap-8 gap-2">
				<div className="relative">
					<button
						className="flex items-center gap-2 font-bold cursor-pointer"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						<span className="sm:block hidden">Filter by status</span>
						<span className="sm:hidden block">Filter</span>
						{isDropdownOpen ? (
							<ChevronUp className="text-primary w-4 h-4" />
						) : (
							<ChevronDown className="text-primary w-4 h-4" />
						)}
					</button>
					{children}
				</div>
				<Button
					type="button"
					className="flex items-center sm:gap-4 gap-2 px-2 py-2"
					variant={"primary"}
					onClick={onNewInvoice}>
					<span className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
						<PlusIcon className="font-bold text-primary" />
					</span>
					<span className="sm:block hidden">New Invoice</span>
					<span className="sm:hidden block">New</span>
				</Button>
			</div>
		</div>
	);
}

export default PageHeader;
