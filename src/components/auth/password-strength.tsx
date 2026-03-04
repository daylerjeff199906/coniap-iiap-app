'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
    checks: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ checks }) => {
    const strengthItems = [
        { label: 'At least 8 characters', met: checks.length },
        { label: 'At least one uppercase letter', met: checks.uppercase },
        { label: 'At least one lowercase letter', met: checks.lowercase },
        { label: 'At least one number', met: checks.number },
        { label: 'At least one special character', met: checks.special },
    ];

    const score = Object.values(checks).filter(Boolean).length;

    const colors = [
        'bg-zinc-800', // 0
        'bg-red-500',  // 1
        'bg-orange-500', // 2
        'bg-yellow-500', // 3
        'bg-lime-500', // 4
        'bg-primary', // 5
    ];

    return (
        <div className="space-y-3 pt-2">
            <div className="flex gap-1 h-1 w-full">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            "h-full flex-1 rounded-full transition-all duration-500",
                            level <= score ? colors[score] : "bg-zinc-800"
                        )}
                    />
                ))}
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                {strengthItems.map((item, index) => (
                    <li
                        key={index}
                        className={cn(
                            "flex items-center gap-1.5 transition-colors duration-300",
                            item.met ? "text-primary font-medium" : "text-zinc-500"
                        )}
                    >
                        {item.met ? (
                            <Check size={12} className="shrink-0" />
                        ) : (
                            <X size={12} className="shrink-0 opacity-20" />
                        )}
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};
