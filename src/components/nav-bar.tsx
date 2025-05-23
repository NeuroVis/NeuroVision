'use client'
import Image from "next/image";
import imagine from "../../public/logo-white.png"

export function NavBar() {
    return (
        <div className="flex flex-row shadow-xl shadow-indigo-800  text-white justify-center gap-2 items-center bg-indigo-800">
            <Image src={imagine} alt={"icon"} width={50} height={50} ></Image>
            <p className={"text-2xl font-semibold"}>NeuroVision</p>
        </div>
    );
}
