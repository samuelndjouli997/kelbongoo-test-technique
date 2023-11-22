import React from "react";

interface ButtonProps {
    children: React.ReactNode;
}

const Button = ({children}: ButtonProps) => {
    return (
        <button className="px-4 py-2 rounded bg-primary-green text-primary-orange hover:bg-primary-dark-green hover:text-primary-dark-orange transition-colors duration-300">
            {children}
        </button>
    )

}

export default Button;