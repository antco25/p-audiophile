import React from "react"
import { urlFor } from "./sanityClient"
import { Categories } from "./sanityType"

export const getRichText = (richText: [{ text: string, bold: boolean }[]], boldStyle?: string) => {
    let elements: JSX.Element[] = []

    richText.forEach((line, i, arr) => {
        line.forEach((words, y) => {
            if (words.bold && boldStyle) {
                elements.push(<span key={i + '_' + y} className={boldStyle}>{words.text}</span>)
            } else {
                elements.push(<React.Fragment key={i + '_' + y}>{words.text}</React.Fragment>);
            }
        })

        if (i + 1 !== arr.length) {
            elements.push(<br key={i} />)
        }
    })
    return elements;
}

export const formatCategories = (categories: any) => {
    const formatted: Categories[] = categories.map((category: any) => {
        return {
            name: category.name,
            image: urlFor(category.image).url(),
            order: category.order
        }
    })

    return formatted;
}