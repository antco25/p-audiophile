import React from "react"
import { urlFor } from "./sanityClient"
import { Categories, CategoryProduct, Product, Recommendation } from "./sanityType"

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

const getText = (data: { children: { text: string }[] }[]) => {
    let text = '';
    data.forEach(el => {
        text += el.children[0].text;
    })
    return text;
}

export const formatCategories = (categories: any) => {
    const formatted: Categories[] = categories.map((category: any) => {
        return {
            name: category.name,
            id: category._id,
            image: urlFor(category.image).url(),
            order: category.order
        }
    })

    return formatted;
}

export const formatCategoryProducts = (categoryProducts: any, category: string) => {
    const formatted: CategoryProduct[] = categoryProducts.map((categoryProduct: any) => {
        return {
            name: categoryProduct.name,
            newProduct: categoryProduct.newProduct,
            slug: categoryProduct.slug.current,
            category: category,
            categoryImage: categoryProduct.categoryImage.map((image: any) => urlFor(image).url()),
            description: getText(categoryProduct.description)
        }
    })

    return formatted;
}

export const formatProduct = (product: any) => {
    const formatted: Product = {
        name: product.name,
        id: product._id,
        newProduct: product.newProduct,
        slug: product.slug.current,
        price: product.price,
        category: product.category.name.toLowerCase(),
        description: getText(product.description),
        features: getText(product.features),
        boxItems: product.boxItems.map((el: any) => el),
        image: product.image.map((image: any) => urlFor(image).url()),
        cartImage: urlFor(product.cartImage).url(),
        categoryImage: product.categoryImage.map((image: any) => urlFor(image).url()),
        recommendImage: product.recommendImage.map((image: any) => urlFor(image).url()),
        gallerySmallOne: product.gallerySmallOne.map((image: any) => urlFor(image).url()),
        gallerySmallTwo: product.gallerySmallTwo.map((image: any) => urlFor(image).url()),
        galleryLarge: product.galleryLarge.map((image: any) => urlFor(image).url()),
    }

    return formatted;
}

export const formatRecommendations = (recommendations: any) => {
    const formatted: Recommendation[] = recommendations.map((recommendation: any) => {
        return {
            name: recommendation.name,
            slug: recommendation.slug.current,
            recommendImage: recommendation.recommendImage.map((image: any) => urlFor(image).url()),
        }
    })

    return formatted;
}