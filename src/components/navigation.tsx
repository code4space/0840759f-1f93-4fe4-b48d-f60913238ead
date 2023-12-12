"use client"
import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalFireDepartmentSharpIcon from '@mui/icons-material/LocalFireDepartmentSharp';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import MovingSharpIcon from '@mui/icons-material/MovingSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import DesktopMacSharpIcon from '@mui/icons-material/DesktopMacSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CategoryIcon from '@mui/icons-material/Category';
import '@/assets/css/navigation.css'
import { z } from 'zod';

interface NavbarProps {
    children: ReactNode;
}

const NavbarState = z.object({
    active: z.number(),
    showDetail: z.boolean(),
    isMobile: z.boolean(),
    activeMobNav: z.boolean(),
    activeMobTopNav: z.boolean(),
});

export default function Navbar({ children }: NavbarProps): JSX.Element {
    const router = useRouter()

    const [state, setState] = useState<z.infer<typeof NavbarState>>({
        active: 0,
        showDetail: true,
        isMobile: false,
        activeMobNav: false,
        activeMobTopNav: false,
    });

    const { active, showDetail, isMobile, activeMobNav, activeMobTopNav } = state;

    function handleButton(i: number, route: string) {
        setState((prev) => ({ ...prev, active: i, activeMobNav: !activeMobNav }));
        router.push(route);
    }

    function handleDetail() {
        setState((prev) => ({ ...prev, showDetail: !showDetail, activeMobNav: !activeMobNav }));
    }

    function logout() {
        document.cookie = "access_token=; max-age=0; path=/";
        router.push('/login');
    }

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.innerWidth <= 768;
            setState((prev) => ({ ...prev, isMobile: isMobileDevice }));
        };

        handleResize();

        const route = ['/', '/product', '/growth', '/history'];
        const index = route.indexOf(location.pathname)
        setState((prev) => ({ ...prev, active: index < 0 ? 0 : index }));

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (usePathname() === '/login') {
        return <>{children}</>;
    }

    const style = {
        menu: 'cursor-pointer text-gray-500 bg-none border-2 border-solid border-white p-1 rounded-2xl transition-all duration-300 ease-in-out flex items-center hover:text-gray-600 hover:bg-gray-200 active:border-2 active:border-solid active:border-purple-200',
        list: 'relative w-full list-none text-white text-base flex items-center h-12 pl-3 cursor-pointer mb-3 z-10 transition-all duration-500 ease-in-out font-semibold'
    }

    return (
        <main className='flex w-screen h-screen'>
            <nav className="flex">
                {isMobile ? (
                    <>
                        {activeMobNav && <div className='w-full h-full absolute bg-black bg-opacity-40 z-20 backdrop-blur' onClick={handleDetail}></div>}
                        <div className='transition-all duration-500 ease-in-out h-screen bg-purple-600 pt-3 pl-3 absolute z-30 overflow-hidden w-60' style={activeMobNav ? { maxWidth: '230px' } : { maxWidth: '0px', padding: '0' }}>
                            <div className=' text-white text-xl mb-10 ml-3 cursor-pointer flex items-center gap-1 h-8' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> <p>Ambisius</p></div>
                            <div className='absolute w-full pl-3 transition-all duration-500 ease-in-out ' style={{ left: '1px', top: `${active * 60 + 84}px` }}><div className='bg-white rounded-3xl w-11/12 h-12 relative z-10'></div></div>
                            <ul>
                                <li className={`${active === 0 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon /> <p>&nbsp; Dashboard</p> </li>
                                <li className={`${active === 1 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(1, '/product') }}><CategoryIcon /> <p>&nbsp; Product</p></li>
                                <li className={`${active === 2 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(2, '/growth') }}><MovingSharpIcon /> <p>&nbsp; Growth</p></li>
                                <li className={`${active === 3 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(3, '/history') }}><HistorySharpIcon /> <p>&nbsp; History</p></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className='transition-all duration-500 ease-in-out h-screen bg-purple-600 pt-3 pl-3 relative' style={showDetail ? { width: '230px' } : { width: '70px' }}>
                        <div className=' text-white text-xl mb-10 ml-3 cursor-pointer flex items-center gap-1 h-8' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> {showDetail && <p>Ambisius</p>}</div>
                        <div className='absolute w-full pl-3 transition-all duration-500 ease-in-out' style={{ left: '1px', top: `${active * 60 + 82}px` }}><div className='active'></div></div>
                        <ul>
                            <li className={`${active === 0 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon className='text-2xl mr-3' /> {showDetail && <p>Dashboard</p>} </li>
                            <li className={`${active === 1 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(1, '/product') }}><CategoryIcon className='text-2xl mr-3' /> {showDetail && <p>Product</p>}</li>
                            <li className={`${active === 2 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(2, '/growth') }}><MovingSharpIcon className='text-2xl mr-3' /> {showDetail && <p>Growth</p>}</li>
                            <li className={`${active === 3 ? 'activeNav' : ''} ${style.list}`} onClick={() => { handleButton(3, '/history') }}><HistorySharpIcon className='text-2xl mr-3' /> {showDetail && <p>History</p>}</li>
                        </ul>
                    </div>
                )}
            </nav>
            <nav className='h-full flex flex-col w-full transition-all duration-500 ease-in-out' style={isMobile ? undefined : showDetail ? { width: 'calc(100% - 230px)' } : { width: 'calc(100% - 70px)' }}>
                <div className='shadow-md bg-white px-5 py-3 z-10 flex items-center justify-between'>
                    <button onClick={handleDetail} className={style.menu}><MenuOutlinedIcon /></button>
                    <div className='flex gap-3'>
                        {isMobile ? (
                            <button className={style.menu} onClick={() => { setState((prev) => ({ ...prev, activeMobTopNav: !activeMobTopNav })) }}><MoreVertIcon /></button>
                        ) : (
                            <>
                                <button className={style.menu}><PersonIcon /></button>
                                <button className={style.menu}> <SettingsIcon /></button>
                                <button className={style.menu} onClick={logout}><LogoutSharpIcon /></button>
                            </>
                        )}
                    </div>
                    {(isMobile && activeMobTopNav) && (
                        <div className='absolute top-16 right-5 flex flex-col bg-white rounded-xl p-3 shadow-md'>
                            <button className={style.menu}><PersonIcon /> &nbsp;Account</button>
                            <button className={style.menu}> <SettingsIcon /> &nbsp;Setting</button>
                            <button className={style.menu} onClick={logout}><LogoutSharpIcon /> &nbsp;Logout</button>
                        </div>
                    )}
                </div>
                <div className='w-full p-5 overflow-y-auto' style={{ height: 'calc(100% - 60px)' }}>
                    {children}
                </div>
            </nav>
        </main>
    );
}
