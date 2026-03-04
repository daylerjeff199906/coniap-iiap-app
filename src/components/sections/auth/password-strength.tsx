'use client';

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

interface PasswordStrengthProps {
    checks: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        special: boolean;
    };
}

export function PasswordStrength({ checks }: PasswordStrengthProps) {
    return (
        <div className="space-y-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border text-xs">
            <div className="flex items-center gap-2">
                {checks.length ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <div className="h-4 w-4 border rounded-full" />
                )}
                <span>At least 8 characters</span>
            </div>
            <div className="flex items-center gap-2">
                {checks.uppercase ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <div className="h-4 w-4 border rounded-full" />
                )}
                <span>One uppercase letter</span>
            </div>
            <div className="flex items-center gap-2">
                {checks.lowercase ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <div className="h-4 w-4 border rounded-full" />
                )}
                <span>One lowercase letter</span>
            </div>
            <div className="flex items-center gap-2">
                {checks.number ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <div className="h-4 w-4 border rounded-full" />
                )}
                <span>One number</span>
            </div>
            <div className="flex items-center gap-2">
                {checks.special ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <div className="h-4 w-4 border rounded-full" />
                )}
                <span>One special character (@$!%*?&)</span>
            </div>
        </div>
    );
}
