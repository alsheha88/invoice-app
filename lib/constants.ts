export const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const statusPills = {
	paid: {
		label: "Paid",
		parentStyle: "bg-success/20",
		textStyle: "text-success",
	},
	pending: {
		label: "Pending",
		parentStyle: "bg-pending/10",
		textStyle: "text-pending",
	},
	draft: {
		label: "Draft",
		parentStyle: "bg-draft",
		textStyle: "text-draft-foreground",
	},
};

export const paymentTerms = [
	{ title: "Net 1 Day", value: 1 },
	{ title: "Net 7 Days", value: 7 },
	{ title: "Net 14 Days", value: 14 },
	{ title: "Net 30 Days", value: 30 },
];
