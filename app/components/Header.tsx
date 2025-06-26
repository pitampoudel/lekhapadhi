import {useEffect, useState} from "react";
import {BellIcon} from "lucide-react";
import {useSession} from "next-auth/react";
import Image from "next/image";
import NepaliDate from "nepali-date-converter";

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

    return <header className="bg-theme-primary-700 shadow-sm flex justify-between items-center">
        <div className="px-4 py-3">
            <h1 className="text-xl font-semibold text-theme-light">
                {greeting}, {user?.name || 'Guest'}
            </h1>
            <p className="text-sm text-theme-light opacity-80">
                {(() => {
                    const nepaliDate = new NepaliDate(new Date());
                    const weekdays = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'];
                    const months = ['बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'];
                    return `${weekdays[nepaliDate.getDay()]} ${nepaliDate.getDate()} ${months[nepaliDate.getMonth()]} ${nepaliDate.getYear()}`;
                })()}
            </p>
        </div>
        <div className="flex items-center gap-4 px-4 py-3">
            <div className="relative">
                <BellIcon
                    className="cursor-pointer w-6 h-6 text-theme-light hover:text-primary-200 transition-colors"/>
                <span
                    className="absolute -top-1 -right-1 bg-red-500 text-theme-light text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            2
                        </span>
            </div>
            {user?.image ? (
                <Image
                    width={32}
                    height={32}
                    className="rounded-full"
                    src={user.image}
                    alt="Profile"
                />
            ) : (
                <span
                    className="hidden md:inline text-sm font-medium text-theme-light">
                    {user?.name ? user.name.split(' ')[0] : 'Login'}
                </span>
            )}
        </div>
    </header>
}
