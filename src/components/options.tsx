'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

export default function Option({title, items}:{title:string, items:string[]}): React.ReactElement {
    return (
        <div className="flex flex-col text-black gap-2">
            <p className={""}>{title}</p>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="choose..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}