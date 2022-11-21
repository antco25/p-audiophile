export default {
    name: 'banner',
    type: 'document',
    title: 'Banner',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Product',
            type: "reference",
            to: [{ type: 'product' }],
            options: {
                disableNew: true
            } 
        },
        {
            name: 'header',
            title: 'Header',
            type: 'array',
            of: [{
                type: 'block',
                styles: [],
                lists: [],
                marks: { annotations: [] }
            }]
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
            name: 'imageDesktop',
            title: 'Desktop Images',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'imageTablet',
            title: 'Tablet Images',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'imageMobile',
            title: 'Mobile Images',
            type: 'image',
            options: {
                hotspot: true
            }
        },
    ]
}