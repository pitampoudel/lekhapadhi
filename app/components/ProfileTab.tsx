import React from "react";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
  // Sample user data - in a real app, this would come from props, API, or state management
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Content */}
        <div className="px-6 py-8">
          <div className="flex items-center space-x-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>

            {/* User Information */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <div className="text-lg text-gray-900">{user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3">
          <p className="text-sm text-gray-500 text-center">
            Profile information is read-only
          </p>
        </div>
      </div>
    </div>
  );
}
