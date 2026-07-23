import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
import { deleteInvoice } from "@/actions/services";

type Props = {
	slug: string;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    isModalOpen: boolean;
};
function Modal({ slug,setIsModalOpen, isModalOpen }: Props) {
	const handleDelete = async () => {
		await deleteInvoice(slug);
	};
	return (
		isModalOpen && <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-100" onClick={() => setIsModalOpen(false)}>
			<div className="grid gap-3 p-12 bg-card rounded-lg " onClick={(e) => e.stopPropagation()}>
				<h2 className="text-2xl font-bold text-foreground">Confirm Deletion</h2>
				<p className="text-sm font-medium text-secondary-foreground">
					Are you sure you want to delete invoice # {slug}? This action cannot
					be undone.
				</p>
				<div className="flex gap-3 items-center place-content-end mt-4">
					<Button variant={"tertiary"} onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
					<Button variant={"destructive"} onClick={handleDelete} type="button">Delete</Button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
