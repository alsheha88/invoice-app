import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";


const buttonVariants = cva("min-w-20 h-12 text-[0.9375rem] font-bold text-center rounded-[1.5rem] tracking-[-0.0156rem] disabled:opacity-50 cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
            tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive-hover"
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
