"use client";
import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import SifarisTypeDropdown from './components/SifarisTypeDropdown';
import SifarisForm from './components/SifarisForm';
import PDFPreview from './components/PDFPreview';
import {useSearchParams} from 'next/navigation';
import {
    BellIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ClockIcon,
    FileIcon,
    FileTextIcon,
    HomeIcon,
    LogOutIcon,
    MenuIcon,
    UserIcon,
    XIcon
} from "lucide-react";
import {signOut, useSession} from "next-auth/react";

export default function Dashboard() {
    const {data: session} = useSession();
    const user = session?.user;
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState("overview");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [greeting, setGreeting] = useState("");

    // State for generate functionality
    const [sifarisType, setSifarisType] = useState('');
    const [formData, setFormData] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    // Check for tab query parameter
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'requests', 'generate', 'profile'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleLogout = async () => {
        await signOut({callbackUrl: '/'});
    };

    // Handlers for generate functionality
    const handleTypeChange = (type: string) => {
        setSifarisType(type);
        setFormData(null);
        setShowPreview(false);
    };

    const handleFormSubmit = (data: any) => {
        setFormData(data);
        setShowPreview(true);
    };

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

    if (!user) {
        return <div></div>;
    }

    return (
        <div className="min-h-screen h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100"
                >
                    {mobileMenuOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
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

            {/* Main Content */}
            <main className="flex-1 p-6 pt-16 md:pt-6 overflow-y-auto h-screen">
                <header className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {greeting}, {user.name || 'Guest'}
                        </h1>
                        <p className="text-sm text-gray-600">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <BellIcon
                                className="cursor-pointer w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                2
                            </span>
                        </div>
                        <div
                            className="cursor-pointer flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full py-1 px-3">
                            <div
                                className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                                {user.image ? (
                                    <Image
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                        src={user.image}
                                        alt="Profile"
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <span className="hidden md:inline text-sm font-medium">
                                {user.name ? user.name.split(' ')[0] : 'Login'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                {activeTab === "overview" && (
                    <>
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card
                                title="Applications Submitted"
                                value="4"
                                icon={<FileTextIcon className="w-5 h-5 text-blue-500"/>}
                                trend="+2 this month"
                                color="blue"
                            />
                            <Card
                                title="Approved"
                                value="2"
                                icon={<CheckCircleIcon className="w-5 h-5 text-green-500"/>}
                                trend="100% success rate"
                                color="green"
                            />
                            <Card
                                title="Pending"
                                value="1"
                                icon={<ClockIcon className="w-5 h-5 text-amber-500"/>}
                                trend="Avg. 2 days wait time"
                                color="amber"
                            />
                        </section>

                        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
                                <button
                                    onClick={() => setActiveTab("requests")}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    View all <ChevronRightIcon className="w-4 h-4 ml-1"/>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Document
                                            Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">नागरिकता
                                            सिफारिस
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-05-15</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Approved
                                                </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">जन्म
                                            दर्ता सिफारिस
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-06-20</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                                    Pending
                                                </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">चारित्रिक
                                            प्रमाणपत्र
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-04-10</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Approved
                                                </span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}

                {activeTab === "requests" && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold mb-4">My Requests</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Document
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">नागरिकता
                                        सिफारिस
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-05-15</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Approved
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                        <button>Download</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">जन्म
                                        दर्ता सिफारिस
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-06-20</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                                Pending
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                        <button>Track</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">चारित्रिक
                                        प्रमाणपत्र
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-04-10</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Approved
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                        <button>Download</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">विवाह
                                        दर्ता सिफारिस
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2023-03-05</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Rejected
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                        <button>View Details</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "profile" && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-bold mb-6">My Profile</h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                                    {user.image ? (
                                        <Image
                                            width={128}
                                            height={128}
                                            className="w-full h-full object-cover"
                                            src={user.image}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-100">
                                            <UserIcon className="w-16 h-16 text-blue-500"/>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Change Photo
                                </button>
                            </div>
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full
                                            Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue={user.name || ''}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            defaultValue={user.email || ''}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone
                                            Number</label>
                                        <input
                                            type="tel"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your address"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "generate" && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-100 p-3 rounded-full mr-3">
                                <FileTextIcon className="w-6 h-6 text-blue-600"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">सिफारिस पत्र तयार गर्नुहोस्</h2>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type</label>
                            <SifarisTypeDropdown
                                selectedType={sifarisType}
                                onTypeChange={handleTypeChange}
                            />
                        </div>

                        {sifarisType && !showPreview && (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Fill Application Details</h3>
                                <SifarisForm
                                    sifarisType={sifarisType}
                                    onFormSubmit={handleFormSubmit}
                                />
                            </div>
                        )}

                        {showPreview && formData && (
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-medium text-gray-800">Document Preview</h3>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    >
                                        फारम सम्पादन गर्नुहोस्
                                    </button>
                                </div>

                                <PDFPreview
                                    sifarisType={sifarisType}
                                    formData={formData}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-8 text-center text-sm text-gray-600 py-4">
                    <p>© 2023 लेखापाडी. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <Link href="#" className="hover:text-blue-600">Terms of Service</Link>
                        <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
                        <Link href="#" className="hover:text-blue-600">Contact Us</Link>
                    </div>
                </footer>
            </main>
        </div>
    );
}

type CardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    color?: 'blue' | 'green' | 'amber' | 'red';
};

function Card({title, value, icon, trend, color = 'blue'}: CardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200',
        amber: 'bg-amber-50 border-amber-200',
        red: 'bg-red-50 border-red-200'
    };

    const textColorClasses = {
        blue: 'text-blue-800',
        green: 'text-green-800',
        amber: 'text-amber-800',
        red: 'text-red-800'
    };

    const trendColorClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        amber: 'text-amber-600',
        red: 'text-red-600'
    };

    return (
        <div className={`${colorClasses[color]} p-6 rounded-lg border shadow-sm transition-transform hover:scale-105`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-gray-700">{title}</h3>
                {icon}
            </div>
            <p className={`text-3xl font-bold mb-2 ${textColorClasses[color]}`}>{value}</p>
            {trend && <p className={`text-xs ${trendColorClasses[color]}`}>{trend}</p>}
        </div>
    );
}
