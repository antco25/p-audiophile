import React from 'react'
import styles from './index.module.scss';

interface FormFieldProps {
    className: string,
    id: string,
    label: string,
    placeholder: string,
    inputType: string,
    length?: number,
    data: { value: string, error: boolean, errMessage: string },
    setData: React.Dispatch<React.SetStateAction<{
        value: string; error: boolean; errMessage: string;
    }>>
}

const FormField = ({ className, id, label, placeholder, inputType, length, data, setData }: FormFieldProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputType === 'number') {
            if (!e.target.validity.valid || (length && e.target.value.length > 0 && e.target.value.length !== length)) {
                setData({ value: e.target.value, error: false, errMessage: 'Wrong format' })
                return;
            }
        }

        if (inputType === 'email') {
            if (e.target.validity.typeMismatch) {
                setData({ value: e.target.value, error: false, errMessage: 'Wrong format' })
                return;
            }
        }

        if (inputType === 'tel') {
            if (e.target.validity.patternMismatch) {
                setData({ value: e.target.value, error: false, errMessage: 'Wrong format' })
                return;
            }
        }

        setData({ value: e.target.value, error: false, errMessage: '' })
    }

    return (
        <div className={className}>
            <label className={`${styles.label}${data.error ? ' ' + styles.error : ''}`} htmlFor={id}>{label}</label>
            {data.error ? <span className='absolute right-0 font-medium text-xs text-red-700'>{data.errMessage}</span> : null}
            <input className={`${styles.input}${data.error ? ' ' + styles.error : ''}`} type={inputType} name={id} placeholder={placeholder}
                value={data.value} onInput={handleInputChange} onWheel={inputType === 'number' ? (e) => e.currentTarget.blur() : undefined}
                pattern={inputType === 'tel' ? "[0-9]{3}[0-9]{3}[0-9]{4}|[0-9]{3}-[0-9]{3}-[0-9]{4}" : undefined}
            />
        </div>
    )
}

export default FormField