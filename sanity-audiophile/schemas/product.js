export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'newProduct',
            title: 'New Product ?',
            type: 'boolean',
            initialValue: false,
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 90)
            }
        },
        {
            name: 'category',
            title: 'Category',
            type: "reference",
            to: [{ type: 'category' }],
            options: {
                disableNew: true
            } 
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{
                type: 'block',
                styles: [],
                lists: [],
                marks: { decorators: [], annotations: [] }
            }]
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{
                type: 'block',
                styles: [],
                lists: [],
                marks: { decorators: [], annotations: [] }
            }]
        },
        {
            name: 'boxItems',
            title: 'In the Box',
            type: 'array',
            of: [
                {
                    name: 'name',
                    type: 'object',
                    title: 'Box Item',
                    fields: [
                        {
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        },
                        {
                            name: 'quantity',
                            title: 'Quantity',
                            type: 'number',
                        },
                    ]
                }
            ],
        },
        {
            name: 'image',
            title: 'Product Image [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
        {
            name: 'cartImage',
            title: 'Cart Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'categoryImage',
            title: 'Category Product Image [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
        {
            name: 'recommendImage',
            title: 'Recommended Product Image [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
        {
            name: 'gallerySmallOne',
            title: 'Gallery Small Image 1 [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
        {
            name: 'gallerySmallTwo',
            title: 'Gallery Small Image 2 [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
        {
            name: 'galleryLarge',
            title: 'Gallery Large Image [Desktop / Tablet / Mobile]',
            type: 'array',
            of: [{
                type: 'image', options: {
                    hotspot: true
                }
            }]
        },
    ]
}