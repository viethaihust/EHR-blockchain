import React from 'react';
import { Button } from 'antd';
export default function Header() {
    return (
        <header className="top-0 w-full fixed h-[4rem] bg-slate-100 flex items-center">
            <Button type='primary' className='bg-slate-600 ml-auto mr-20'>Login</Button>
        </header>
    )
}