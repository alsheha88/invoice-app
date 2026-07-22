import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
	currentMonth: string;
	currentYear: number;
	blanks: any[];
	days: number[];
	isOpen: boolean;
	handlePrevMonth: () => void;
	handleNextMonth: () => void;
	handleSelectDay: (day: number) => void;
	isSelected: (day: number) => boolean;
};
function DatePickerDropdown({
	currentMonth,
	currentYear,
	blanks,
	days,
	handleNextMonth,
	handlePrevMonth,
	handleSelectDay,
	isSelected,
	isOpen,
}: Props) {

	return (
		isOpen && (
			<div className="w-full grid gap-4 px-2 py-4 absolute right-0 shadow-row bg-dropdown rounded-lg z-50">
				<div className="flex items-center justify-between">
					<button
						type="button"
						className="cursor-pointer"
						onClick={handlePrevMonth}>
						<ChevronLeft className="stroke-primary" />
					</button>
					<span className="text-foreground font-bold">
						{currentMonth} {currentYear}
					</span>
					<button
						type="button"
						className="cursor-pointer"
						onClick={handleNextMonth}>
						<ChevronRight className="stroke-primary" />
					</button>
				</div>
				<div className="grid grid-cols-7">
					{blanks.map((item, i) => (
						<span key={i}>{item}</span>
					))}
					{days.map((item) => (
						<button
							type="button"
							key={item}
							onClick={() => handleSelectDay(item)}
							className={`${isSelected(item) ? "text-primary" : "text-foreground"} font-bold hover:text-primary cursor-pointer`}>
							{item}
						</button>
					))}
				</div>
			</div>
		)
	);
}

export default DatePickerDropdown;
