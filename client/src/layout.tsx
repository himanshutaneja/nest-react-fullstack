import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img className="h-9 w-52" src="https://www.ipgmediabrands.com/wp-content/themes/JointsWP-CSS-master/assets/images/icons/Mediabrands_KO-01.png" alt="Your Company" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className='bg-white shadow'>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
