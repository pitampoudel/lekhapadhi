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
        blue: 'bg-theme-primary-50 border-theme-primary-200',
        green: 'bg-theme-success border-theme-success',
        amber: 'bg-theme-warning border-theme-warning',
        red: 'bg-theme-error border-theme-error'
    };

    const textColorClasses = {
        blue: 'text-theme-primary',
        green: 'text-theme-primary',
        amber: 'text-theme-primary',
        red: 'text-theme-primary'
    };

    const trendColorClasses = {
        blue: 'text-theme-secondary',
        green: 'text-theme-secondary',
        amber: 'text-theme-secondary',
        red: 'text-theme-secondary'
    };

    return (
        <div className={`${colorClasses[color]} p-6 rounded-lg border shadow-sm transition-transform`}>
            <div className="flex justify-between items-start mb-4">
                <h3 className={`text-sm font-medium ${trendColorClasses[color]}`}>{title}</h3>
                {icon}
            </div>
            <p className={`text-3xl font-bold mb-2 ${textColorClasses[color]}`}>{value}</p>
            {trend && <p className={`text-xs ${trendColorClasses[color]}`}>{trend}</p>}
        </div>
    );
}
