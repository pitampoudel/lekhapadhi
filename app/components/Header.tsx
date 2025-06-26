import {useEffect, useState} from "react";
import {BellIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const {data: session} = useSession();
    const user = session?.user;
    const [greeting, setGreeting] = useState("");
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    return <header className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-xl font-semibold text-gray-800">
                {greeting}, {user?.name || 'Guest'}
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
                    {user?.image ? (
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
                <span
                    className="hidden md:inline text-sm font-medium">
                    {user?.name ? user.name.split(' ')[0] : 'Login'}
                </span>
            </div>
        </div>
    </header>
}