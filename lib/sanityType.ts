export interface Categories {
    name: string,
    id: string,
    image: string,
    order: number
}

export interface CategoryProduct {
    name: string,
    newProduct: boolean,
    slug: string,
    category: string,
    categoryImage: string[],
    description: string
}

export interface Product extends CategoryProduct {
    price: number,
    features: string,
    boxItems: { name: string, quantity: number }[],
    image: string[],
    cartImage: string,
    recommendImage: string[],
    gallerySmallOne: string[],
    gallerySmallTwo: string[],
    galleryLarge: string[],
    id: string
}

export interface Recommendation {
    name: string,
    slug: string,
    recommendImage: string[]
}