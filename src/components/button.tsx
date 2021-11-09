import { MouseEventHandler } from 'react';

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
}

const Button = ({ onClick, label }: Props) => {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
