"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation';
import {MenuIcon, XIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import DashboardTab from "@/app/tabs/DashboardTab";
import DocumentsTab from "@/app/tabs/DocumentsTab";
import ProfileTab from "@/app/tabs/ProfileTab";
import CreateTab from "@/app/tabs/CreateTab";

export default function Dashboard() {
    const {data: session} = useSession();
    const user = session?.user;
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("dashboard");

    // Check for tab query parameter
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['dashboard', 'documents', 'create', 'profile'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen h-screen flex flex-col md:flex-row bg-theme-content">
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-full bg-theme-card shadow-md text-theme-gray-600 hover:bg-theme-gray-100"
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

            <Sidebar
                mobileMenuOpen={mobileMenuOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen">
                <Header/>
                <div className="px-6 mt-6">
                    {/* Dashboard Content */}
                    {activeTab === "dashboard" && <DashboardTab setActiveTab={setActiveTab}/>}
                    {activeTab === "documents" && <DocumentsTab/>}
                    {activeTab === "create" && <CreateTab/>}
                    {activeTab === "profile" && <ProfileTab user={user}/>}
                </div>
            </main>
        </div>
    );
}
