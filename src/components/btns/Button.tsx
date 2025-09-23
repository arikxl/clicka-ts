import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
    disabled?: boolean;
};

const Button = ({ children, onClick, type, disabled }: Props) => {
    return (
        <button type={type} disabled={disabled }
            className={`w-full flex items-center justify-center  cursor-pointer bg-[hotpink] text-white border-none text-xl py-2 px-5 rounded-[10px] ${disabled?'bg-slate-700' :''}`}
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;