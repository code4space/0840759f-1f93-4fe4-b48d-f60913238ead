import React, { useEffect, useState, ChangeEvent } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { z } from 'zod';

const PasswordInputProps = z.object({
    state: z.any(),
    setState: z.function().args(z.any()).returns(z.any()),
    value: z.string().optional(),
    placeHolder: z.string(),
    strength: z.boolean().optional(),
    required: z.boolean().optional(),
    withoutLabel: z.boolean().optional(),
});

const InputProps = z.object({
    state: z.any(),
    setState: z.function().args(z.any()).returns(z.any()),
    value: z.string().optional(),
    placeHolder: z.string(),
    withoutLabel: z.boolean().optional(),
});


const InputEmailProps = z.object({
    state: z.any(),
    setState: z.function().args(z.any()).returns(z.any()),
    value: z.string().optional(),
    placeHolder: z.string(),
});

function passwordStrengthParameter(password: string) {
    // Define a regular expression to match common patterns
    var patterns = {
        medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%-+=_)(*?&^';":/.{},?><\[\]]).{10,}$/
    };

    // Check the password against the defined patterns
    if (patterns.strong.test(password)) {
        return { status: "strong", color: '#33c770' };
    } else if (patterns.medium.test(password)) {
        return { status: "medium", color: '#ceb532' };
    } else if (password.length > 5) {
        return { status: "weak", color: '#ff2929' };
    } else {
        return { status: "very weak", color: 'gray' };
    }
}

export function PasswordInput({
    state,
    setState,
    value,
    placeHolder,
    strength = false,
    required = true,
    withoutLabel = false,
}: z.infer<typeof PasswordInputProps>) {
    const [isHide, setIsHide] = useState(true);
    const [password, setPassword] = useState<{ status: string; color: string }>({
        status: '',
        color: '',
    });

    function handleIsHide() {
        setIsHide(!isHide);
    }

    function handleChangeState(e: ChangeEvent<HTMLInputElement>) {
        if (!value) setState(e.target.value);
        else setState({ ...state, [value]: e.target.value });
    }

    useEffect(() => {
        let temp: { status: string; color: string } = { status: '', color: '' };
        if (!value) temp = passwordStrengthParameter(state);
        else temp = passwordStrengthParameter(state[value]);
        setPassword(temp);
    }, [state, value]);

    return (
        <div className="inputBox">
            <input
                type={isHide ? 'password' : 'text'}
                required={required}
                value={value ? state[value] : state}
                onChange={handleChangeState}
                placeholder={withoutLabel ? placeHolder : ' '}
            />
            {withoutLabel ? null : <label>{placeHolder}</label>}
            {strength && (
                <p
                    style={{ border: `1px solid ${password.color}`, color: password.color }}
                    className="strength"
                >
                    {password.status}
                </p>
            )}
            {isHide ? (
                <VisibilityOutlinedIcon onClick={handleIsHide} />
            ) : (
                <VisibilityOffOutlinedIcon onClick={handleIsHide} />
            )}
        </div>
    );
}

export function Input({ state, setState, value, placeHolder, withoutLabel = false }: z.infer<typeof InputProps>) {
    function handleChangeState(e: ChangeEvent<HTMLInputElement>) {
        if (!value) setState(e.target.value);
        else setState({ ...state, [value]: e.target.value });
    }

    function checkValue() {
        if (value) return state[value];
        else return state ?? "";
    }

    return (
        <div className={checkValue()?.length ? 'active-input inputBox' : 'inputBox'}>
            <input
                type="text"
                required
                value={value ? state[value] : state}
                onChange={handleChangeState}
                placeholder={withoutLabel ? placeHolder : ' '}
            />
            {withoutLabel ? null : <label>{placeHolder}</label>}
        </div>
    );
}

export function InputEmail({ state, setState, value, placeHolder }: z.infer<typeof InputEmailProps>) {
    function handleChangeState(e: ChangeEvent<HTMLInputElement>) {
        if (!value) setState(e.target.value);
        else setState({ ...state, [value]: e.target.value });
    }

    function checkValue() {
        if (value) return state[value];
        else return state;
    }

    return (
        <div className={checkValue().length ? 'active-input inputBox' : 'inputBox'}>
            <input
                type="email"
                required
                value={value ? state[value] : state}
                onChange={handleChangeState}
            />
            <label>{placeHolder}</label>
        </div>
    );
}


export function InputNumber({ state, setState, value, placeHolder, withoutLabel = false }: z.infer<typeof InputProps>) {
    function handleChangeState(e: ChangeEvent<HTMLInputElement>) {
        if (!value) setState(e.target.value);
        else setState({ ...state, [value]: e.target.value });
    }

    function checkValue() {
        if (value) return state[value];
        else return state;
    }

    return (
        <div className={checkValue().length ? 'active-input inputBox' : 'inputBox'}>
            <input
                type="number"
                required
                value={value ? state[value] : state}
                onChange={handleChangeState}
                placeholder={withoutLabel ? placeHolder : ' '}
            />
            {withoutLabel ? null : <label>{placeHolder}</label>}
        </div>
    );
}