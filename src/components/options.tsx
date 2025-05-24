'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";

export default function Option({title, items}:{title:string, items:string[]}): React.ReactElement {
    return (
        <div className="flex flex-col text-black gap-2">
            <HoverCard >
                <HoverCardTrigger asChild>
                    <p className={"text-[16px]"}>{title}</p>
                </HoverCardTrigger>
                <HoverCardContent className="w-45 bg-indigo-100">
                    <div className={"text-[14px]"}>
                        Click to find out
                        <br/>
                        more about this option.
                    </div>
                </HoverCardContent>
            </HoverCard>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="choose..."/>
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

///
