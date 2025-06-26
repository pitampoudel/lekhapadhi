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
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200',
        amber: 'bg-amber-50 border-amber-200',
        red: 'bg-red-50 border-red-200'
    };

    const textColorClasses = {
        blue: 'text-blue-800',
        green: 'text-green-800',
        amber: 'text-amber-800',
        red: 'text-red-800'
    };

    const trendColorClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        amber: 'text-amber-600',
        red: 'text-red-600'
    };

    return (
        <div className={`${colorClasses[color]} p-6 rounded-lg border shadow-sm transition-transform hover:scale-105`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-gray-700">{title}</h3>
                {icon}
            </div>
            <p className={`text-3xl font-bold mb-2 ${textColorClasses[color]}`}>{value}</p>
            {trend && <p className={`text-xs ${trendColorClasses[color]}`}>{trend}</p>}
        </div>
    );
}