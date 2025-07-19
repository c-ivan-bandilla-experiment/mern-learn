import React from 'react'
import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <header className='bg-base-400 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className="text-3xl font-bold text-center text-primary font-mono tracking-tight">ThinkBoard</h1>
                    <nav >
                        <ul className="flex items-center gap-4">
                            <li>
                                <Link to={"/create"} className='btn btn-primary'>
                                    <PlusIcon className="size-5 " />
                                    <span>New Note</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar