import React, { useEffect, useState } from 'react';

interface QuantityCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    initialQuantity?: number,
    onQuantityChange?: (quantity: number) => void
}

const QuantityCounter = ({ initialQuantity, onQuantityChange, ...props }: QuantityCounterProps) => {

    const [quantity, setQuantity] = useState(initialQuantity ? initialQuantity : 1);

    useEffect(() => {
        onQuantityChange?.(quantity);
    }, [quantity])

    useEffect(() => {
        setQuantity(initialQuantity? initialQuantity : 1);
    }, [initialQuantity])

    const increment = () => {
        setQuantity((prevQuantity) => {
            return prevQuantity + 1;
        });
    }

    const decrement = () => {
        setQuantity((prevQuantity) => {
            if (prevQuantity - 1 < 1) {
                return 1;
            }
            return prevQuantity - 1;
        })
    }

    return (
        <div className={`${props.className ? props.className + ' ' : ''} flex items-center font-bold text-center text-sm leading-[18px] bg-slate-100`}>
            <button className='opacity-50 box-content w-4 p-4 hover:text-pOrange-200' onClick={decrement}>-</button>
            <p className='self-center w-6'>{quantity}</p>
            <button className='opacity-50 box-content w-4 p-4 hover:text-pOrange-200' onClick={increment}>+</button>
        </div>
    )
}



export default QuantityCounter