import React from "react";

type CardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    color?: 'blue' | 'green' | 'amber' | 'red';
};

export default function Card({title, value, icon, trend, color = 'blue'}: CardProps) {
    const colorClasses = {
        blue: 'bg-theme-primary-600 bg-opacity-10 border-theme-primary-600 border-opacity-20',
        green: 'bg-theme-success-600 bg-opacity-10 border-theme-success-600 border-opacity-20',
        amber: 'bg-amber-50 border-amber-200', // Keeping amber as is since no theme equivalent
        red: 'bg-theme-error bg-opacity-10 border-theme-error border-opacity-20'
    };

    const textColorClasses = {
        blue: 'text-theme-primary-600',
        green: 'text-theme-success-600',
        amber: 'text-amber-800', // Keeping amber as is since no theme equivalent
        red: 'text-theme-error'
    };

    const trendColorClasses = {
        blue: 'text-theme-primary-600',
        green: 'text-theme-success-600',
        amber: 'text-amber-600', // Keeping amber as is since no theme equivalent
        red: 'text-theme-error'
    };

    return (
        <div className={`${colorClasses[color]} p-6 rounded-lg border shadow-sm transition-transform`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-theme-gray-600">{title}</h3>
                {icon}
            </div>
            <p className={`text-3xl font-bold mb-2 ${textColorClasses[color]}`}>{value}</p>
            {trend && <p className={`text-xs ${trendColorClasses[color]}`}>{trend}</p>}
        </div>
    );
}
