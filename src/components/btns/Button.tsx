import React from 'react';

type Props = {
    children: React.ReactNode;
    onClick: () => void;
};

const Button = ({ children, onClick }: Props) => {
    return (
        <button className='cursor-pointer bg-[hotpink] text-white border-none text-xl py-[5px] px-5 rounded-[10px]'
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;