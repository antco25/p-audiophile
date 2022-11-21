import React from "react"

export const getRichText = (richText: [{ text: string, bold: boolean }[]], boldStyle?: string) => {
    let elements: JSX.Element[] = []

    richText.forEach((line, i, arr) => {
        line.forEach((words, i) => {
            if (words.bold && boldStyle) {
                elements.push(<span key={i} className={boldStyle}>{words.text}</span>)
            } else {
                elements.push(<React.Fragment key={i}>{words.text}</React.Fragment>);
            }
        })

        if (i + 1 !== arr.length) {
            elements.push(<br key={i} />)
        }
    })
    return elements;
}