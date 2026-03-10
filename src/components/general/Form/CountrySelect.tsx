'use client'

import * as React from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import countries from "@/utils/json/countries.json"
import Image from "next/image"

interface CountrySelectProps {
    value?: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function CountrySelect({ value, onChange, placeholder = "Seleccionar país...", className }: CountrySelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
                {countries.map((country) => (
                    <SelectItem key={country.code} value={country.country}>
                        <div className="flex items-center gap-2">
                            <img
                                src={country.flag}
                                alt={country.country}
                                className="w-5 h-3.5 object-cover rounded-sm border border-slate-100"
                            />
                            <span className="text-sm">{country.country}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
