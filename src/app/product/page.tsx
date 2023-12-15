"use client"
import { baseUrl } from "@/constant/url"
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "./loading";
import ModalPopUp from "@/components/modal";
import { Input, InputNumber } from "@/components/input";

const ProductSchema = z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string(),
    price: z.number().min(0, 'Price cannot be negative'),
    stock: z.number().min(0, 'Stock cannot be negative'),
    rating: z.number().min(0, 'Rating cannot be negative'),
    id: z.number(),
});

function InputSearch() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '')
    const router = useRouter()
    function onsubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.push('/product?q=' + search)
    }

    return (
        <form className="form-search shadow-md mb-3 text-gray-600" onSubmit={onsubmit}>
            <label htmlFor="search">
                <input autoComplete="off" placeholder="Search Products" id="search" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} />
                <button className="icon" type="submit">
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-on">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                    <svg strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="swap-off">
                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                </button>
                <button type="reset" className="close-btn" onClick={() => setSearch('')}>
                    <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                    </svg>
                </button>
            </label>
        </form>
    )
}

export default function Page() {
    const [products, setProducts] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [editForm, setEditForm] = useState({
        modalOpen: false,
        title: '',
        description: '',
        price: 0,
        stock: 0,
        id: 0
    })
    const [addForm, setAddForm] = useState({
        modalOpen: false,
        title: '',
        description: '',
        price: '',
        stock: '',
    })

    const searchParams = useSearchParams();

    async function fetchData() {
        try {
            setLoading(true)
            const page: number = parseInt(searchParams.get('page') || '1', 10);
            const limit: number = parseInt(searchParams.get('limit') || '10', 10);
            const q: string | null = searchParams.get('q');
            const category: string | null = searchParams.get('category');

            const skip = (page - 1) * limit || 0;

            const queryParams = new URLSearchParams({
                limit: limit.toString(),
                skip: skip.toString(),
                select: 'title,price,stock,rating,id,description',
                ...(q && { q }),
            });

            let url
            if (category) url = `${baseUrl}/products/${category ? `category/${category}` : ''}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            else url = `${baseUrl}/products/${q ? 'search' : ''}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

            const res = await fetch(url);
            const { products, total } = await res.json();

            setProducts(products);
            setTotalPage(Math.ceil(total / limit));
            setActivePage(Math.floor(skip / limit) + 1 || 1);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            throw new Error(errorMessage);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(); // Call the fetchData function
    }, [searchParams]);

    function navigate(page: number) {
        const q: string | null = searchParams.get('q');
        return `?page=${page}` + `${q ? '&q=' + q : ''}`
    }

    function deleteProduct(id: number, title: string) {
        //? Deleting a product will not delete it into the server

        Swal.fire({
            title: `Are you sure you want delete this product "${title}"`,
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: 'Yes',
            confirmButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    await axios.delete(baseUrl + `/products/${id}`)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Delete Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
                    throw new Error(errorMessage);
                } finally {
                    setLoading(false)
                }
            }
        });
    }

    async function updateProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //? Updating a product will not update it into the server
        try {
            setLoading(true)
            await axios.put(baseUrl + `/products/${editForm.id}`)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Success',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            throw new Error(errorMessage);
        } finally {
            setLoading(false)
            setEditForm(prev => ({ ...prev, modalOpen: false }))
        }
    }

    async function addProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        //? Updating a product will not update it into the server
        try {
            setLoading(true)
            await axios.post(baseUrl + `/products/add`)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Success Add Product',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred while adding the product';
            throw new Error(errorMessage);
        } finally {
            setLoading(false)
            setAddForm(prev => ({ ...prev, modalOpen: false }))
        }
    }

    const openModalEdit = useCallback((id: number) => {
        const productToEdit = products.find(product => product.id === id);
        if (productToEdit) {
            setEditForm(prev => ({
                ...prev,
                ...productToEdit,
                modalOpen: true,
                id
            }));
        }
    }, [products]);

    if (loading) return <Loading />
    return (
        <>
            {editForm.modalOpen &&
                <ModalPopUp title="Edit Product" close={() => setEditForm((prev) => ({ ...prev, modalOpen: false }))}>
                    <form action="" onSubmit={updateProduct}>
                        <div className="mt-3 flex gap-3 flex-col">
                            <Input placeHolder="Title" state={editForm} setState={setEditForm} value="title"></Input>
                            <Input placeHolder="Description" state={editForm} setState={setEditForm} value="description"></Input>
                            <div className="dual-input">
                                <InputNumber placeHolder="Price" state={editForm} setState={setEditForm} value="price"></InputNumber>
                                <InputNumber placeHolder="Stock" state={editForm} setState={setEditForm} value="stock"></InputNumber>
                            </div>
                        </div>
                        <div className="w-full flex flex-row-reverse  mt-3">
                            <button type="submit" className="ml-auto border rounded-md bg-blue-500 text-white p-1 text-xs md:text-base">Submit</button>
                        </div>
                    </form>
                </ModalPopUp>
            }
            {addForm.modalOpen &&
                <ModalPopUp title="Edit Product" close={() => setAddForm((prev) => ({ ...prev, modalOpen: false }))}>
                    <form action="" onSubmit={addProduct}>
                        <div className="mt-3 flex gap-3 flex-col">
                            <Input placeHolder="Title" state={addForm} setState={setAddForm} value="title"></Input>
                            <Input placeHolder="Description" state={addForm} setState={setAddForm} value="description"></Input>
                            <div className="dual-input">
                                <InputNumber placeHolder="Price" state={addForm} setState={setAddForm} value="price"></InputNumber>
                                <InputNumber placeHolder="Stock" state={addForm} setState={setAddForm} value="stock"></InputNumber>
                            </div>
                        </div>
                        <div className="w-full flex flex-row-reverse  mt-3">
                            <button type="submit" className="ml-auto border rounded-md bg-blue-500 text-white p-1 text-xs md:text-base">Submit</button>
                        </div>
                    </form>
                </ModalPopUp>
            }
            <InputSearch />
            <div className="flex w-full gap-3 mb-3 flex-wrap">
                <div className=' flex-auto shadow-md p-3 rounded-xl bg-white transition-all relative'>
                    <div className="w-full mb-3 flex justify-between py-1 pl-4 pr-8 items-center">
                        <h1 className="text-xl text-gray-800 font-bold">Product List</h1>
                        <button className="rounded shadow p-1 text-green-400 border border-green-400 hover:bg-green-400 hover:text-white" onClick={() => setAddForm((prev) => ({ ...prev, modalOpen: true }))}>Add New</button>
                    </div>

                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr className=" border-b">
                                <th className="py-2 px-4 border-r">Title</th>
                                <th className="py-2 px-4 border-r">Price</th>
                                <th className="py-2 px-4 border-r">Stock</th>
                                <th className="py-2 px-4">Rating</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(({ title, price, stock, rating, id }: z.infer<typeof ProductSchema>, i: number) => (
                                <tr key={i} className='hover:bg-gray-100'>
                                    <td className="py-2 px-4 border-r">{title}</td>
                                    <td className="py-2 px-4 border-r">{price}</td>
                                    <td className="py-2 px-4 border-r">{stock}</td>
                                    <td className="py-2 px-4">{rating}</td>
                                    <td className="py-2 px-4 flex flex-wrap gap-1 justify-center">
                                        <Link href={`/product/${id}`}><button className=" rounded-lg border border-gray-800 p-1 hover:bg-gray-800 hover:text-white"><SearchIcon /></button></Link>
                                        <button onClick={() => deleteProduct(id, title)} className=" rounded-lg border border-red-500 p-1 hover:bg-red-500 hover:text-white text-red-500"><DeleteIcon /></button>
                                        <button onClick={() => openModalEdit(id)} className=" rounded-lg border border-blue-500 p-1 hover:bg-blue-500 hover:text-white text-blue-500"><EditIcon /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex w-full justify-center'>
                <div className='flex items-center bg-white shadow-md rounded-xl text-gray-600 p-1 gap-1'>
                    {activePage > 1 && <>
                        <Link href={'?'}><KeyboardDoubleArrowLeftOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></Link>
                        <Link href={navigate(activePage - 1)}><ChevronLeftOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></Link>
                    </>}
                    {totalPage > 5 ?
                        <>
                            {[...Array(totalPage - 4 >= activePage ? 3 : 5)].map((_, i) => {
                                if (activePage >= totalPage - 4) return <Link href={navigate(totalPage - 4 + i)} key={i}><span className={`${totalPage - 4 + i === activePage ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{totalPage - 4 + i}</span></Link>
                                else if (activePage > 1) return <Link key={i} href={navigate(activePage - 1 + i)}><span className={`${activePage - 1 + i === activePage ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{activePage - 1 + i}</span></Link>
                                else return <Link key={i} href={navigate(i + 1)}><span className={`${i + 1 === activePage ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{i + 1}</span></Link>
                            })}
                            {totalPage - 4 >= activePage &&
                                <><p>...</p>
                                    <Link href={navigate(totalPage)}><span className={`${totalPage === activePage ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{totalPage}</span></Link></>
                            }
                        </> :
                        [...Array(totalPage)].map((_, i) => {
                            return <Link href={`?page=${i + 1}`} key={i}><span className={`${i + 1 === activePage ? ' bg-blue-400 text-white' : ''} cursor-pointer rounded px-2 hover:underline`}>{i + 1}</span></Link>
                        })
                    }
                    {activePage < totalPage && <>
                        <Link href={navigate(activePage + 1)}><KeyboardArrowRightOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></Link>
                        <Link href={navigate(totalPage)}><KeyboardDoubleArrowRightOutlinedIcon className=" cursor-pointer rounded hover:bg-gray-200" /></Link>
                    </>}
                </div>
            </div>
        </>
    )
}