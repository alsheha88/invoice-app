"use client";
import { Dispatch, SetStateAction } from "react";
import DatePicker from "./date-picker/DatePicker";
import AddressFields from "./form-subcomponents/AddressFields";
import PaymentTerm from "./payment-term/PaymentTerm";
import ItemRow from "./form-subcomponents/ItemRow";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import {
	useForm,
	FormProvider,
	useFieldArray,
	Controller,
} from "react-hook-form";
import { draftSchema, NewInvoiceInput, sendSchema } from "@/schemas/schemas";
import { ChevronLeft } from "lucide-react";

type Props = {
	mode: "edit" | "add";
	defaultValues: NewInvoiceInput;
	id?: string;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	action: (
		invoice: NewInvoiceInput,
		status: "pending" | "draft",
	) => Promise<void>;
};

function InvoiceForm({
	mode,
	id,
	isOpen,
	setIsOpen,
	defaultValues,
	action,
}: Props) {
	const methods = useForm<NewInvoiceInput>({ defaultValues });
	const {
		handleSubmit,
		control,
		setError,
		formState: { isLoading, errors },
	} = methods;

	const { fields, append, remove } = useFieldArray({ control, name: "items" });
	const onSend = handleSubmit((data) => {
		const parsed = sendSchema.safeParse(data);
		if (!parsed.success) {
			parsed.error.issues.forEach((issue) => {
				console.log(parsed.error.issues);
				setError(issue.path.join(".") as any, { message: "can't be empty" });
			});
			return;
		}
		action(parsed.data, "pending");
		setIsOpen(false);
	});

	const onDraft = handleSubmit((data) => {
		const parsed = draftSchema.safeParse(data);
		if (!parsed.success) return;
		action(parsed.data, "draft");
		setIsOpen(false);
	});

	return (
		isOpen && (
			<div className="fixed h-dvh top-0 left-0 md:left-20 md:w-full bg-black/50 ">
				<FormProvider {...methods}>
					<form className="bg-background h-full rounded-tr-lg p-6 py-30 md:py-6 flex flex-col gap-6 w-dvw md:w-[75%] lg:w-[50%] overflow-y-scroll scrollbar-thin scrollbar-thumb-tertiary scrollbar-track-transparent form-animation">
						{mode === "edit" && (
							<button
								className="flex items-center font-bold gap-2 cursor-pointer"
								onClick={() => setIsOpen(false)}>
								<ChevronLeft width={20} height={20} className="text-primary" />{" "}
								Go back
							</button>
						)}
						<h2 className="text-foreground font-bold text-2xl leading-8">
							{mode === "edit" ? (
								<>
									Edit <span className="text-secondary-foreground">#</span> {id}
								</>
							) : (
								"New Invoice"
							)}
						</h2>{" "}
						<h3 className="text-primary font-bold">Bill From</h3>
						<AddressFields prefix="senderAddress" />
						<h3 className="text-primary font-bold">Bill To</h3>
						<Input label="Client's Name" name="clientName" type={"text"} />
						<Input label="Client's Email" name="clientEmail" type={"text"} />
						<AddressFields prefix="clientAddress" />
						<div className="grid gap-4">
							<Controller
								control={control}
								name="createdAt"
								render={({ field }) => (
									<DatePicker value={field.value} onChange={field.onChange} />
								)}
							/>{" "}
							<Controller
								control={control}
								name="paymentTerms"
								render={({ field }) => (
									<PaymentTerm value={field.value} onChange={field.onChange} />
								)}
							/>
						</div>
						<Input
							label="Project Description"
							name="description"
							type={"text"}
						/>
						<p className="text-lg text-secondary-foreground font-bold">
							Item List
						</p>
						<div className="hidden md:grid md:grid-cols-[4fr_2fr_3fr_3fr_1fr] gap-4 text-[0.8125rem] font-medium text-secondary-foreground">
							<span>Item Name</span>
							<span>Qty.</span>
							<span>Price</span>
							<span>Total</span>
							<span></span>
						</div>
						{fields.map((item, index) => (
							<ItemRow
								key={item.id}
								index={index}
								onDelete={() => remove(index)}
							/>
						))}
						<Button
							variant={"secondary"}
							type="button"
							onClick={() => append({ name: "", quantity: 1, price: 0 })}>
							+ Add New Item
						</Button>
						{Object.keys(errors).length > 0 && (
							<div className="flex flex-col gap-1 text-[0.8125rem] font-bold text-destructive">
								<span>- All fields must be added</span>
								{fields.length === 0 && <span>- An item must be added</span>}
							</div>
						)}
						<div className="w-full  flex items-center justify-end gap-2 sm:relative fixed bottom-0 left-0 sm:bg-transparent bg-card sm:p-0 px-3 py-6 shadow-row sm:shadow-none">
							<Button
								variant={"secondary"}
								type="button"
								className=""
								onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							{mode === "add" && (
								<Button
									variant={"tertiary"}
									type="button"
									onClick={onDraft}
									disabled={isLoading}>
									Save as Draft
								</Button>
							)}
							<Button
								variant={"primary"}
								type="button"
								className="min-w-max"
								onClick={onSend}
								disabled={isLoading}>
								{mode === "edit" ? "Save Changes" : "Save & Send"}
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		)
	);
}

export default InvoiceForm;
