import * as React from "react";
import styles from "./button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "black" | "pistachio" | "yellow" | "pistachio-black";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", ...props }, ref) => {

        // Construimos las clases usando el objeto 'styles' importado
        const combinedClasses = `
            ${styles.base}
            ${styles[variant]}
            ${className || ''}
            `;

        return (
            <button
                className={combinedClasses}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };