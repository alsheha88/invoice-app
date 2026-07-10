import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";


const buttonVariants = cva("flex items-center justify-between h-12 text-[0.9375rem] font-bold text-center rounded-[1.5rem] tracking-[-0.0156rem] disabled:opacity-50", {
    variants: {
        variant: {
            primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
            secondary: "",
            tertiary: "",
            destructive: ""
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
