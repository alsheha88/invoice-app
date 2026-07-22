import { statusPills } from "@/lib/constants";

type Props = { status: "paid" | "pending" | "draft" };

function StatusPill({ status }: Props) {
	const { label, parentStyle, textStyle } = statusPills[status];
	return (
		<div
			className={`flex items-center justify-center gap-2 w-26 h-10 rounded-lg ${parentStyle} ${textStyle}`}>
			<span className="w-2 h-2 rounded-full bg-current" />
			<p className="font-bold">{label}</p>
		</div>
	);
}

export default StatusPill;
