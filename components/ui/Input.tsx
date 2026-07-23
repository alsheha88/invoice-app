"use client";
import { useFormContext } from "react-hook-form";

type Props = {
	label: string;
	name: string;
	type?: string;
	hideLabelOnDesktop?: boolean;
};

function Input({ label, name, type = "text", hideLabelOnDesktop }: Props) {
	const { register, formState: { errors } } = useFormContext();
	const error = name.split(".").reduce<any>((obj, key) => obj?.[key], errors);

	return (
		<div className="flex flex-col gap-2 min-w-0">
			<div className="flex items-center justify-between">
				<label
					htmlFor={name}
					className={`text-[0.8125rem] font-medium tracking-[-0.0063rem] ${
						error ? "text-destructive" : "text-secondary-foreground"
					} ${hideLabelOnDesktop ? "md:sr-only" : ""}`}>
					{label}
				</label>
				{error && (
					<span className="text-[0.6875rem] font-medium text-destructive">
						{error.message}
					</span>
				)}
			</div>
			<input
				id={name}
				type={type}
				className={`w-full bg-input lg:px-5 px-2 py-3 text-base text-left font-bold tracking-[-0.0156rem] text-foreground border rounded-sm focus:outline-primary ${
					error ? "border-destructive" : "border-border"
				}`}
				{...register(name, type === "number" ? { valueAsNumber: true } : {})}
			/>
		</div>
	);
}

export default Input;