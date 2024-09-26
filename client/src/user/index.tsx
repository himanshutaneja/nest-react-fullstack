import { TrashIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const User = () => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5">
                <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                    <div className='flex items-center mt-1 text-xs leading-6 text-gray-500'>
                        <EnvelopeIcon className="size-4" />
                        <p className="pl-1">leslie.alexander@example.com</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs leading-5 text-gray-500">
                        <PhoneIcon className="size-4" />
                        <p className="pl-1">+61431956951</p>
                    </div>
                </div>
                <button className="rounded-md bg-slate-300 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <TrashIcon className="size-8 mx-5" />
                </button>
            </li>

            <li className="flex justify-between gap-x-6 py-5">
                <div className="flex flex-col items-start">
                    <p className="text-lg font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                    <div className='flex items-center mt-1 text-xs leading-6 text-gray-500'>
                        <EnvelopeIcon className="size-4" />
                        <p className="pl-1">leslie.alexander@example.com</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs leading-5 text-gray-500">
                        <PhoneIcon className="size-4" />
                        <p className="pl-1">+61431956951</p>
                    </div>
                </div>
                <button className="rounded-md bg-slate-300 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <TrashIcon className="size-8 mx-5" />
                </button>
            </li>
        </ul>
    )
}

export default User
