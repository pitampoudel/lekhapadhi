"use client";
import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ 
  children, 
  activeTab, 
  setActiveTab 
}: { 
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
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
        {children}
      </main>
    </div>
  );
}