import React from 'react'

const PatternCircles = ({ ...props }) => {
  return (
    <svg viewBox="0 0 944 944" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="#FFF" fill="none" fillRule="evenodd" opacity=".202"><circle cx="472" cy="472" r="235.5" />
        <circle cx="472" cy="472" r="270.5" />
        <circle cx="472" cy="472" r="471.5" />
      </g>
    </svg>
  )
}

export default PatternCircles