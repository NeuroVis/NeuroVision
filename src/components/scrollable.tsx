import {Slider} from "@/components/ui/slider";
import {useState} from "react";


export default function Scrollable({text1, text2, defval, max,min, step}: { text1: string, text2?: string, defval: number, max: number, min: number, step: number }) {
    const [value, setValue] = useState<number[]>([10]);
    return (
        <div className="flex flex-col text-black gap-2 text-wrap w-[180px]">
            <p className={"text-sm w-[160px]"}>{text1}<span>{value[0]}</span>{text2}</p>
            <Slider defaultValue={[defval]} value={value} onValueChange={setValue} max={max} min={min} step={step} className="w-[180px]"></Slider>
        </div>
    );
}