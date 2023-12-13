import axios from "axios"
import Link from "next/link";

export default async function Page() {
    const response = await axios.get('https://dummyjson.com/products/categories');
    const categories = response.data;

    const darkColorsRGB = [
        'rgb(55, 55, 55)',
        'rgb(75, 0, 230)',
        'rgb(128, 0, 128)',
        'rgb(0, 0, 255)',
        'rgb(0, 128, 128)',
        'rgb(0, 128, 0)',
        'rgb(255, 0, 0)',
    ];

    return (
        <>
            <h1 className="mb-4 font-bold text-3xl text-gray-700">Category</h1>
            <div className="flex flex-wrap gap-3 flex-column">
                {categories.map((el: string[], i: number) => {
                    const randomDarkColor = darkColorsRGB[Math.floor(Math.random() * darkColorsRGB.length)];
                    const style = { borderColor: randomDarkColor, "--color-button": randomDarkColor }
                    return <Link href={`/product?category=${el}`} key={i} className={`cursor-pointer px-2 py-1 border rounded-lg shadow-sm relative top-0 transition-all duration-200 ease-in-out hover:shadow-md hover:-top-1 category-button`} style={style}>{el}</Link>
                })}
            </div>
        </>
    )
}