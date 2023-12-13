'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { z } from 'zod'
import Loading from '../loading';
import { Star } from '@mui/icons-material';
import Link from 'next/link';

type paramScheme = {
    params: { productID: string };
};

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export default function Page({ params }: paramScheme) {
    const [product, setProduct] = useState<Product | undefined>();
    const [loading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${params.productID}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params.productID]);

    if (loading || !product) return <Loading />;

    return (
        <div className='flex flex-wrap'>
            <div className="relative w-2/6 flex-auto shadow-md mb-5 pl-4" style={{ minWidth: '220px' }} data-carousel="static">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {product.images.map((el, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
                                }`}
                            style={{ zIndex: index === activeIndex ? 1 : 0 }}
                        >
                            <img src={el} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="absolute z-10 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-white" : "bg-gray-500"}`}
                            aria-current={index === activeIndex ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                            data-carousel-slide-to={index}
                            onClick={() => setActiveIndex(index)}
                        ></button>
                    ))}
                </div>
                <button
                    type="button"
                    className="absolute top-0 start-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none backdrop-blur bg-white bg-opacity-10"
                    data-carousel-prev
                    onClick={() => setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                    {'<'}
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none backdrop-blur bg-white bg-opacity-10"
                    data-carousel-next
                    onClick={() => setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                    {'>'}
                </button>
            </div>
            <div className='w-full md:w-4/6 pl-5'>
                <h1 className='font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl w-full'>{product.title} - {product.brand} </h1>
                <p >Rating <Star className=' text-yellow-500 relative' style={{ top: '-2px' }} />{product.rating}</p>
                <h2 className='font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl mt-3 text-gray-800 '>${(product.price - ((product.discountPercentage / 100) * product.price)).toFixed(2)} USD</h2>
                <h3 className='mt-2'><b className=' bg-red-200 text-red-500 p-1 rounded-md'>{product.discountPercentage}%</b><span className=' line-through ml-1 text-gray-600'>${product.price} USD</span></h3>
                <h3 className='mt-8 font-bold text-gray-800 text-lg'>Description</h3>
                <p>{product.description}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand}</p>
                <p className='mt-2'>Tag: <Link href={`/product?category=${product.category}`} className='ml-2 cursor-pointer border border-gray-800 p-1 rounded-md hover:bg-gray-800 text-gray-800 hover:text-white relative transition-all duration-200 ease-in-out hover:shadow-md'>{product.category}</Link></p>
            </div>
        </div>
    );
} 