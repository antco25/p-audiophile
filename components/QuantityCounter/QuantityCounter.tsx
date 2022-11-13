import React, { useState } from 'react';

const QuantityCounter = ({ ...props }) => {

    const [quantity, setQuantity] = useState(1);
    const increment = () => {
        setQuantity((quantity) => quantity + 1 );
    }
    const decrement = () => {
        setQuantity((quantity) => {
            if (quantity - 1 < 1) return 1;
            return quantity - 1;
        } )
    }

    return (
        <div className={`${props.className ? props.className + ' ' : ''} flex font-bold text-center text-sm leading-[18px] bg-slate-100`}>
            <button className='opacity-50 box-content w-4 p-4' onClick={decrement}>-</button>
            <p className='self-center w-6'>{quantity}</p>
            <button className='opacity-50 box-content w-4 p-4' onClick={increment}>+</button>
        </div>
    )
}



export default QuantityCounter