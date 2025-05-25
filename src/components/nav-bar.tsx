'use client'
import Image from "next/image";
import imagine from "../../public/logo-white.png"
import {CircleHelp} from "lucide-react";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {isTopLayer} from "@floating-ui/utils/dom";

export function NavBar() {
    return (
        <div className="flex flex-row shadow-xl shadow-indigo-800  text-white justify-center gap-2 items-center bg-indigo-800">
            <Sheet>
                <SheetTrigger asChild>
                    <CircleHelp className={"absolute left-2"}></CircleHelp>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className={"font-bold text-xl"}>NeuroVision</SheetTitle>
                        <SheetDescription className={"text-black text-[14px]"}>
                            <br/>
                            NeuroVision is an interactive platform for designing, understanding, and experimenting with neural networks - all in your browser.
                            <br /><br />
                            <span className={"font-semibold"}>What’s a Neural Network?</span>
                            <br/>
                            A neural network is a type of computer model designed to recognize patterns and make decisions by learning from examples.
                            It’s inspired by the way human brains process information. At its core, a neural network is made up of layers of simple units (called neurons) that pass signals to each other.
                            As the network trains on data, it gradually adjusts the strength of these connections, getting better at solving the task it's given - whether that’s recognizing images, understanding speech, or making predictions.
                            <br /><br />
                            You can click on any label and you’ll be provided with an explanation on what it does and how to use it.
                            <br /><br />
                            This feature is designed to make exploration intuitive, so feel free to click around and learn more as you go.
                        </SheetDescription>
                    </SheetHeader>

                    <SheetFooter className={"flex items-center "}>
                        <SheetClose asChild>
                            <p className={"text-sm"}>Have some fun, design your own neural network! ;)</p>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <div className="flex flex-row   text-white justify-center gap-2 items-center ">
                <Image src={imagine} alt={"icon"} width={50} height={50} ></Image>
                <p className={"text-2xl font-semibold"}>NeuroVision</p>
            </div>
        </div>

    );
}


///