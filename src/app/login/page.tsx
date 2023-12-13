'use client'
import { Input, PasswordInput } from '@/components/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/constant/url'
import Swal from "sweetalert2";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

export default function Page() {
    const router = useRouter()
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    async function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { username, password, } = data
        await axios({
            url: baseUrl + `/auth/login`,
            method: "POST",
            data: { username, password }
        })
            .then((res) => {
                if (res.status !== 200) throw new Error("something went wrong");
                return res.data;
            })
            .then(({ token: access_token }) => {
                router.push('/')
                document.cookie = `access_token=${access_token}; path=/; max-age=14400`

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: `ERROR ${error.response.status}`,
                    text: error.response.data.message,
                });
            })
    }

    return (
        <div className='min-h-screen w-screen flex items-center justify-center relative bg-cover'
            style={{ backgroundImage: 'url(https://images5.alphacoders.com/132/1323475.png)' }}>
            <div className='w-5/6 max-w-screen-md p-1 rounded-md shadow-md border-container bg-white bg-opacity-70 backdrop-blur'>
                <div className='rounded p-6 flex flex-col items-center relative'>
                    <h3 className='text-purple-500 text-2xl font-semibold'>AMBISIUS</h3>
                    <h4 className='text-purple-500 mb-3 font-semibold'>SIGN IN</h4>
                    <span className='absolute top-2 right-2 faq'>
                        <div className=' shadow-md'>
                            <p><b>USER:</b> kminchelle</p>
                            <p><b>PASS:</b> 0lelplR</p>
                        </div>
                        <HelpCenterIcon className='text-purple-400 hover:text-purple-500 cursor-pointer  transition' />
                    </span>
                    <form className='w-full flex px-5 py-10 flex-col gap-3' onSubmit={login}>
                        <Input withoutLabel setState={setData} state={data} value={'username'} placeHolder={'Username'} />
                        <PasswordInput withoutLabel setState={setData} state={data} value={'password'} placeHolder={'Password'} />
                        <button className='basic-button mt-4 hover:bg-purple-600 hover:text-white' type='submit'>Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
