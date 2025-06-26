import Link from "next/link";
import {FileIcon, FileTextIcon, HomeIcon, LogOutIcon, UserIcon} from "lucide-react";
import React from "react";
import {signOut} from "next-auth/react";

const NavItem = ({icon, label, onClick, href, active = false}) => {
    const content = (
        <>
            {icon}
            <span className={`${active ? 'font-medium' : ''}`}>{label}</span>
            {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md"></div>}
        </>
    );

    const baseClasses = `relative cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md text-left transition-colors ${
        active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
    }`;

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {content}
        </button>
    );
};

export default function Sidebar({mobileMenuOpen, activeTab, setActiveTab}: {
    mobileMenuOpen: boolean,
    activeTab: string,
    setActiveTab: (string) => void
}) {
    const handleLogout = async () => {
        await signOut({callbackUrl: '/'});
    };
    return <aside className={`
                fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:w-64 md:z-0 md:flex-shrink-0 md:h-screen overflow-y-hidden
            `}>
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-blue-800">
                <Link href="/" className="flex items-center">
                    <span className="text-3xl mr-2">📝</span>
                    <span>लेखापाडी</span>
                </Link>
            </h2>
            <nav className="flex flex-col gap-2 flex-grow">
                <NavItem
                    icon={<HomeIcon className="w-5 h-5"/>}
                    label="Dashboard"
                    onClick={() => {
                        setActiveTab("overview");
                        setMobileMenuOpen(false);
                    }}
                    active={activeTab === "overview"} href={undefined}/>
                <NavItem
                    icon={<FileTextIcon className="w-5 h-5"/>}
                    label="My Requests"
                    onClick={() => {
                        setActiveTab("requests");
                        setMobileMenuOpen(false);
                    }}
                    active={activeTab === "requests"} href={undefined}/>
                <NavItem
                    icon={<FileIcon className="w-5 h-5"/>}
                    label="New Application"
                    onClick={() => {
                        setActiveTab("generate");
                        setMobileMenuOpen(false);
                    }}
                    active={activeTab === "generate"}
                    href={undefined}/>
                <NavItem
                    icon={<UserIcon className="w-5 h-5"/>}
                    label="Profile"
                    onClick={() => {
                        setActiveTab("profile");
                        setMobileMenuOpen(false);
                    }}
                    active={activeTab === "profile"} href={undefined}/>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <NavItem
                        icon={<LogOutIcon className="w-5 h-5 text-red-500"/>}
                        label="Logout"
                        onClick={handleLogout} href={undefined}/>
                </div>
            </nav>
        </div>
    </aside>
}