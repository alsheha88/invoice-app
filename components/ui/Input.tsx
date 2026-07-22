"use client";
import { useFormContext } from "react-hook-form";

type Props = {
	label: string;
	name: string;
	type?: string;
};

function Input({ label, name, type = "text" }: Props) {
	const { register } = useFormContext();
	return (
		<div className="flex flex-col gap-2">
			<label
				htmlFor={name}
				className="text-[0.8125rem] font-medium text-secondary-foreground tracking-[-0.0063rem]">
				{label}
			</label>
			<input
				id={name}
				type={type}
				className="bg-input lg:px-5 px-2 py-3 text-base text-left font-bold tracking-[-0.0156rem] text-foreground border border-border rounded-sm focus:outline-primary"
				{...register(name, type === "number" ? { valueAsNumber: true } : {})}
			/>
		</div>
	);
}

export default Input;
