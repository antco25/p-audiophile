import React, { SVGProps } from 'react'

interface CrossProps extends SVGProps<SVGSVGElement> {
    fillClass?: string
}
const Cross = ({ fillClass, ...props }: CrossProps) => {
    return (
        <svg viewBox="0 0 15 15" width="15" height="15" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g className={fillClass} fill="#828FA3" fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" /><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" /></g>
        </svg>
    )
}

export default Cross