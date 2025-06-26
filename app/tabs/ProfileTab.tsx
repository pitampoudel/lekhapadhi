"use client";
import React from "react";
import Image from "next/image";
import { UserIcon } from "lucide-react";

type ProfileTabProps = {
    user: any;
};

export default function ProfileTab({ user }: ProfileTabProps) {
    return (
        <div className="bg-theme-white rounded-lg shadow-sm p-6">
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
    );
}
