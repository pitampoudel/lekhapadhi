import React from "react";
import {Calendar, Edit, Mail, MapPin, Phone, User, UserCheck} from "lucide-react";
import {useSession} from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
    const {data: session} = useSession();
    const user = session?.user;

    // Function to get initials from name
    const getInitials = (name: string | null | undefined) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div
                className="bg-theme-light dark:bg-theme-dark-800 rounded-lg shadow-sm border border-theme-gray-200 dark:border-theme-dark-700">
                {/* Profile Header */}
                <div
                    className="bg-theme-primary-600 bg-opacity-10 dark:bg-theme-primary-800 dark:bg-opacity-20 p-6 rounded-t-lg flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Profile Picture */}
                    <div className="relative">
                        {user?.image ? (
                            <Image
                                width={32}
                                height={32}
                                src={user.image}
                                alt={`${user?.name}'s profile`}
                                className="w-32 h-32 rounded-full object-cover border-4 border-theme-light dark:border-theme-dark-700 shadow-md"
                            />
                        ) : (
                            <div
                                className="w-32 h-32 rounded-full bg-theme-primary-600 flex items-center justify-center text-theme-light text-3xl font-bold border-4 border-theme-light dark:border-theme-dark-700 shadow-md">
                                {getInitials(user?.name)}
                            </div>
                        )}
                        <button
                            className="absolute bottom-0 right-0 bg-theme-light dark:bg-theme-dark-700 rounded-full p-1.5 shadow-md border border-theme-gray-200 dark:border-theme-dark-600">
                            <Edit className="w-4 h-4 text-theme-gray-600 dark:text-theme-gray-400"/>
                        </button>
                    </div>

                    {/* User Basic Info */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-theme-gray-900 dark:text-theme-gray-100">{user?.name || "User"}</h2>
                        <p className="text-theme-gray-600 dark:text-theme-gray-300">{user?.email || "No email provided"}</p>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-theme-primary-600 bg-opacity-10 dark:bg-theme-primary-800 dark:bg-opacity-30 text-theme-primary-600 dark:text-theme-primary-400">
                    <UserCheck className="w-3 h-3 mr-1"/>
                    Verified User
                  </span>
                            <span
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-theme-success-600 bg-opacity-10 dark:bg-theme-success-800 dark:bg-opacity-30 text-theme-success-600 dark:text-theme-success-400">
                    Active
                  </span>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-theme-gray-900 dark:text-theme-gray-100 border-b border-theme-gray-200 dark:border-theme-dark-700 pb-2">
                                Personal Information
                            </h3>

                            {/* Name */}
                            <div className="flex items-center space-x-3">
                                <User className="w-5 h-5 text-theme-gray-400 dark:text-theme-gray-500"/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                                        Full Name
                                    </label>
                                    <div
                                        className="text-lg font-semibold text-theme-gray-900 dark:text-theme-gray-100">
                                        {user?.name || "Not provided"}
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-theme-gray-400 dark:text-theme-gray-500"/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                                        Email Address
                                    </label>
                                    <div
                                        className="text-lg text-theme-gray-900 dark:text-theme-gray-100">{user?.email || "Not provided"}</div>
                                </div>
                            </div>

                            {/* Phone (placeholder) */}
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-theme-gray-400 dark:text-theme-gray-500"/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="text-lg text-theme-gray-900 dark:text-theme-gray-100">Not
                                        provided
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-theme-gray-900 dark:text-theme-gray-100 border-b border-theme-gray-200 dark:border-theme-dark-700 pb-2">
                                Additional Information
                            </h3>

                            {/* Join Date (placeholder) */}
                            <div className="flex items-center space-x-3">
                                <Calendar className="w-5 h-5 text-theme-gray-400 dark:text-theme-gray-500"/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                                        Joined On
                                    </label>
                                    <div className="text-lg text-theme-gray-900 dark:text-theme-gray-100">
                                        {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Location (placeholder) */}
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-theme-gray-400 dark:text-theme-gray-500"/>
                                <div>
                                    <label
                                        className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                                        Location
                                    </label>
                                    <div className="text-lg text-theme-gray-900 dark:text-theme-gray-100">Not
                                        provided
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
