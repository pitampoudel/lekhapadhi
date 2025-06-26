import React from "react";
import { User, Mail } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        {/* Profile Content */}
        <div className="px-6 py-8">
          <div className="flex flex-col items-start space-y-6">
            {/* Profile Picture */}
            <div>
              <img
                src={user?.image || ""}
                alt={`${user?.name}'s profile`}
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* User Information */}
            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <div className="text-lg font-semibold text-black">
                    {user?.name}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email Address
                  </label>
                  <div className="text-lg text-black">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
