import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

type Props = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
};

const Button = ({ children, onClick, type }: Props) => {
    return (
        <button type={type} className=' w-full flex items-center justify-center  cursor-pointer bg-[hotpink] text-white border-none text-xl py-2 px-5 rounded-[10px]'
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;