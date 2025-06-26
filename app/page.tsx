"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation';
import {MenuIcon, XIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import OverviewTab from "@/app/components/OverviewTab";
import DocumentsTab from "@/app/components/DocumentsTab";
import ProfileTab from "@/app/components/ProfileTab";
import CreateTab from "@/app/components/CreateTab";

export default function Dashboard() {
    const {data: session} = useSession();
    const user = session?.user;
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState("overview");

    // Check for tab query parameter
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'documents', 'create', 'profile'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            <Sidebar
                mobileMenuOpen={mobileMenuOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Main Content */}
            <main className="flex-1 p-6 pt-16 md:pt-6 overflow-y-auto h-screen">
                <Header/>
                {/* Dashboard Content */}
                {activeTab === "overview" && <OverviewTab setActiveTab={setActiveTab} />}
                {activeTab === "documents" && <DocumentsTab />}
                {activeTab === "profile" && <ProfileTab user={user} />}
                {activeTab === "create" && <CreateTab />}
            </main>
        </div>
    );
}

