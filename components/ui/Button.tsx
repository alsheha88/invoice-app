import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";


const buttonVariants = cva("px-4 py-3 text-[0.9375rem] font-bold text-center rounded-[1.5rem] tracking-[-0.0156rem] disabled:opacity-50 cursor-pointer focus-visible:outline-offset-2", {
    variants: {
        variant: {
            primary: "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:outline-primary",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:outline-primary",
            tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover focus-visible:outline-tertiary",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:outline-destructive"
        }
    }
})


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className, variant ,...props}, ref) => {
	return (
		<button
        ref={ref}
			className={cn(buttonVariants({variant}), className)}
			{...props}
		/>
	);
});

Button.displayName = "Button";
