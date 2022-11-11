import imgXX99II from '../public/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg';
import imgXX99I from '../public/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg';
import imgXX59 from '../public/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg';
import imgZX9 from '../public/assets/product-zx9-speaker/desktop/image-category-page-preview.jpg';
import imgZX7 from '../public/assets/product-zx7-speaker/desktop/image-category-page-preview.jpg';
import imgYX1 from '../public/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg';

const headphones = {
    name: 'Headphones',
    products: [
        {
            name: 'XX99 Mark II',
            newProduct: true,
            image: imgXX99II,
            description: 'The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
        },
        {
            name: 'XX99 Mark I',
            newProduct: false,
            image: imgXX99I,
            description: 'As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.'
        },
        {
            name: 'XX59',
            newProduct: false,
            image: imgXX59,
            description: 'Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.'
        }
    ]
}

const speakers = {
    name: 'Speakers',
    products: [
        {
            name: 'ZX9',
            newProduct: true,
            image: imgZX9,
            description: 'Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.'
        },
        {
            name: ' ZX7',
            newProduct: false,
            image: imgZX7,
            description: 'Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.'
        }
    ]
}

const earphones = {
    name: 'Earphones',
    products: [
        {
            name: ' YX1 wireless',
            newProduct: true,
            image: imgYX1,
            description: 'Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.'
        }
    ]
}

export default { headphones, speakers, earphones }







