import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import DatePickerDropdown from "@/components/ui/DatePickerDropdown";
import DatePickerTrigger from "@/components/ui/DatePickerTrigger";
import Dropdown from "@/components/ui/PaymentTermDropdown";
import DropdownTrigger from "@/components/ui/PaymentTermDropdownTrigger";
import TextInput from "@/components/ui/TextInput";

export default function Home() {
	return (
		<div className="grid place-items-center">
			<main className="">
				Main Page
				<Button variant={"destructive"} className="">
					Button
				</Button>
				<TextInput label="Client name" />
				<div className="relative max-w-max">
					<DropdownTrigger />
				</div>
				<DatePicker />
			</main>
		</div>
	);
}
