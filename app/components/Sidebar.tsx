import Link from "next/link";
import {FileIcon, FileTextIcon, HomeIcon, LogOutIcon, UserIcon} from "lucide-react";
import React from "react";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

const NavItem = ({icon, label, onClick, href, active = false, closeMobileMenu}) => {
    const content = (
        <>
            {icon}
            <span className={`${active ? 'font-medium' : ''}`}>{label}</span>
            {active && <div className="absolute inset-y-0 -left-3 w-1.5 bg-theme-primary-600 rounded-r-md"></div>}
        </>
    );

    const baseClasses = `relative cursor-pointer flex items-center gap-3 py-2 px-3 rounded-md text-left transition-colors ${
        active ? 'bg-theme-primary-600 bg-opacity-10 text-theme-primary-600' : 'text-theme-gray-600 hover:bg-theme-gray-100'
    }`;

    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (closeMobileMenu) closeMobileMenu();
    };

    if (href) {
        return (
            <Link href={href} className={baseClasses} onClick={closeMobileMenu}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={handleClick} className={baseClasses}>
            {content}
        </button>
    );
};

export default function Sidebar({mobileMenuOpen, activeTab, setActiveTab, setMobileMenuOpen}: {
    mobileMenuOpen: boolean,
    activeTab: string,
    setActiveTab: (arg0: string) => void,
    setMobileMenuOpen?: (arg0: boolean) => void
}) {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
    };

    const closeMobileMenu = () => {
        if (setMobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    };
    return <aside className={`
                fixed top-0 left-0 h-full bg-theme-card shadow-lg z-20 transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:w-64 md:z-0 md:flex-shrink-0 md:h-screen overflow-y-hidden
            `}>
        <div className="p-6 h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-theme-primary-600">
                <Link href="/" className="flex items-center">
                    <span className="text-3xl mr-2">📝</span>
                    <span>लेखापढी</span>
                </Link>
            </h2>
            <nav className="flex flex-col gap-2 flex-grow">
                <NavItem
                    icon={<HomeIcon className="w-5 h-5"/>}
                    label="Dashboard"
                    onClick={() => {
                        setActiveTab("dashboard");
                    }}
                    active={activeTab === "dashboard"}
                    href={undefined}
                    closeMobileMenu={closeMobileMenu}/>
                <NavItem
                    icon={<FileTextIcon className="w-5 h-5"/>}
                    label="Documents"
                    onClick={() => {
                        setActiveTab("documents");
                    }}
                    active={activeTab === "documents"}
                    href={undefined}
                    closeMobileMenu={closeMobileMenu}/>
                <NavItem
                    icon={<FileIcon className="w-5 h-5"/>}
                    label="Create"
                    onClick={() => {
                        router.push("/create");
                    }}
                    active={activeTab === "create"}
                    href={undefined}
                    closeMobileMenu={closeMobileMenu}/>
                <NavItem
                    icon={<UserIcon className="w-5 h-5"/>}
                    label="Profile"
                    onClick={() => {
                        setActiveTab("profile");
                    }}
                    active={activeTab === "profile"}
                    href={undefined}
                    closeMobileMenu={closeMobileMenu}/>

                <div className="mt-4 pt-4 border-t border-theme-gray-300">
                    <NavItem
                        icon={<LogOutIcon className="w-5 h-5 text-theme-error"/>}
                        label="Logout"
                        onClick={handleLogout}
                        href={undefined}
                        closeMobileMenu={closeMobileMenu}/>
                </div>
            </nav>
        </div>
    </aside>
}
