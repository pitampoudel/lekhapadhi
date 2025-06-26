"use client";
import Link from "next/link";
import Image from "next/image";
import camel from "../public/camel.jpg";
import { useEffect, useState } from "react";
import {
  BellIcon,
  HomeIcon,
  UserIcon,
  FileTextIcon,
  LogOutIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  // const user = session?.user;
  const user = null;
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="cursor-pointer text-2xl font-bold mb-6">
          <Link href="/">लेखापाडी</Link>
        </h2>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("overview")}
            className="cursor-pointer flex items-center gap-2 text-left"
          >
            <HomeIcon className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className="cursor-pointer flex items-center gap-2 text-left"
          >
            <FileTextIcon className="w-5 h-5" /> My Requests
          </button>
          <button className="cursor-pointer flex items-center gap-2 text-left">
            <FileTextIcon className="w-5 h-5" />
            <Link href="/generate">New Application</Link>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="cursor-pointer flex items-center gap-2 text-left"
          >
            <UserIcon className="w-5 h-5" /> Profile
          </button>
          <button
            onClick={() => alert("Logging out...")}
            className="cursor-pointer flex items-center gap-2 text-left text-red-600"
          >
            <LogOutIcon className="cursor-pointer w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
          <div className="flex items-center gap-4">
            <BellIcon className="relative cursor-pointer w-6 h-6 text-gray-500" />
            <div className="cursor-pointer bg-gray-200 rounded-full w-8 h-8">
              <Image
                className="rounded-full"
                src={user?.image || camel}
                alt="ProfilePic"
              ></Image>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Applications Submitted" value="4" />
            <Card title="Approved" value="2" />
            <Card title="Pending" value="1" />
          </section>
        )}

        {activeTab === "requests" && (
          <div>
            <h2 className="text-lg font-bold mb-4">My Requests</h2>
            <p>List of document requests will appear here.</p>
          </div>
        )}

        {activeTab === "apply" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Apply for a Document</h2>
            <p>Application form component will go here.</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-lg font-bold mb-4">My Profile</h2>
            <p>Profile editing form will go here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
