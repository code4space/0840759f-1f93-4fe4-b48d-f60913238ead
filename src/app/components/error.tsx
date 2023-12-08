"use client"
import '@/app/assets/css/error.css'
import Link from 'next/link'
import React from 'react';
import { useRouter } from "next/navigation"


interface AnimationSetting {
    [key: number]: { '--err-duration': string; '--err-delay': string };
}

type NotFound = {
    type: '404'
}

type Error = {
    type: 'ERROR'
    errorMessage: string,
    reset: () => void
}

type ErrorType = NotFound | Error

export default function ErrorPage(props: ErrorType) {
    const router = useRouter()
    const animationSetting: AnimationSetting = {
        1: { '--err-duration': '2.5s', '--err-delay': '0s' },
        2: { '--err-duration': '2s', '--err-delay': '0.5s' },
        3: { '--err-duration': '3s', '--err-delay': '1s' },
        4: { '--err-duration': '1.5s', '--err-delay': '2s' },
    };
    
    return (
        <div className="error">
            <div className="drop">
                {Array.from({ length: 4 }, (_, i) => i + 1).map((el, i) => {
                    return <span style={animationSetting[el] as React.CSSProperties} key={i}></span>;
                })}
            </div>
            <div className="error-content">
                <div className="stack">
                    {Array.from({ length: 3 }, (_, i) => i).map((el, i) => {
                        const style: React.CSSProperties = { '--index': el } as React.CSSProperties;
                        return <h1 style={style} key={i}>{props.type}</h1>;
                    })}
                </div>
                {props.type === '404' ?
                    <>
                        <h2>PAGE NOT FOUND</h2>
                        <h3>We could not find the page you were looking for.</h3>
                        <div className="err-button">
                            <Link href="/">Back</Link>
                        </div>
                    </>
                    :
                    <>
                        <h2>{props.errorMessage || 'Something went wrong'}</h2>
                        <h3>Please try again later or contact support if the problem persists.</h3>
                        <div className='err-button'>
                            <button onClick={props.reset}>Try Again</button>
                            <button onClick={() => router.push('/')}>Go Back Home</button>

                        </div>
                    </>
                }
            </div>
        </div>
    );
}