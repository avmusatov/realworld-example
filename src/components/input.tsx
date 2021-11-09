import { ChangeEventHandler } from 'react';

interface Props {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name?: string;
    type?: string;
    label?: string;
}

const Input = ({ value, onChange, name, type, label }: Props) => {
    return (
        <div className="form-group">
            {label && name && <label htmlFor={name}>{label}</label>}
            <input
                type={type ? type : 'text'}
                className="form-control"
                id={name}
                placeholder={`Enter ${name ? name : 'information'}`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
