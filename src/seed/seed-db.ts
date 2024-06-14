import { initialData } from "./seed";
import prisma from '../lib/prisma';

async function main() {

    //1. delete preview data
    await Promise.all([
        prisma.product.deleteMany(),
        prisma.productImage.deleteMany(),
        prisma.category.deleteMany()
    ]);

    const { categories, products } = initialData;

    //Categories
    const categoriesData = categories.map( category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( (map, category) => {
        map[ category.name.toLocaleLowerCase() ] = category.id;
        return map;
    }, {} as Record<string, string>)


    //Products

    products.forEach(async(product) => {

        const { images, type, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

    })



    console.log('Seed ejecuted')
}


(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();