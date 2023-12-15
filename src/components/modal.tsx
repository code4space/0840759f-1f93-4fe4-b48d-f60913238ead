import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface modalScheme {
    children: ReactNode,
    title?: string,
    close: () => void
}

export default function ModalPopUp({ children, title = 'Form', close }: modalScheme) {
    return (
        <div className=" w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="backdrop-blur-sm bg-gray-950 bg-opacity-30 w-full h-full" onClick={close}></div>
            <div className="p-2 w-5/6 h-3/4 bg-white absolute rounded-md shadow-lg sm:w-4/6 overflow-y-auto" style={{ animation: 'scaleAnimation 0.3s' }}>
                <div className="flex w-full justify-between border-b pb-1 border-gray-600">
                    <p className="text-xl">{title}</p>
                    <CloseIcon className=" text-gray-700 cursor-pointer hover:text-red-400" onClick={close} data-testid="closeIcon"/>
                </div>
                {children}
            </div>
        </div>
    )
}