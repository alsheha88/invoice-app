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
    isOpen
}: Props) {
	return (
		isOpen && <div className="w-full grid gap-4 px-2 py-4 absolute right-0 shadow-[0px_10px_20px_hsla(231,38%,45%,0.25)] bg-dropdown rounded-lg">
			<div className="flex items-center justify-between">
				<button className="cursor-pointer" onClick={handlePrevMonth}>
					<ChevronLeft color="hsl(252, 94%, 67%)" />
				</button>
				<span className="text-foreground font-bold">
					{currentMonth} {currentYear}
				</span>
				<button className="cursor-pointer" onClick={handleNextMonth}>
					<ChevronRight color="hsl(252, 94%, 67%)" />
				</button>
			</div>
			<div className="grid grid-cols-7">
				{blanks.map((item, i) => (
					<button key={i}>{item}</button>
				))}
				{days.map((item) => (
					<button
						key={item}
						onClick={() => handleSelectDay(item)}
						className={`${isSelected(item) ? "text-primary" : "text-foreground"} font-bold hover:text-primary cursor-pointer`}>
						{item}
					</button>
				))}
			</div>
		</div>
	);
}

export default DatePickerDropdown;
