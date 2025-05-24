'use client'

import Option from "@/components/options";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Brain, Diamond, Dot, Minus, Play, Plus, RotateCcw, SkipForward, Zap} from "lucide-react";
import Scrollable from "@/components/scrollable";
import NeuralNetworkEditor from "@/components/test";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";


export default function Home() {
    return (
        <div>
            <div className="flex pt-3 justify-around shadow-xl py-1 ">
                <div className="flex items-center justify-center gap-2 pl-2">
                    <Button className={"bg-transparent py-5.5 rounded-full hover:bg-indigo-300"}>
                        <RotateCcw className={"size-5 text-black"}/>
                    </Button>
                    <Button className={"bg-indigo-800 py-6.5 rounded-full hover:bg-indigo-950"}>
                        <Play className={"size-7 text-white  fill-white"}/>
                    </Button>
                    <Button className={"bg-transparent py-5.5 rounded-full hover:bg-indigo-300"}>
                        <SkipForward className={"size-5 text-black"}/>
                    </Button>
                    <div className="flex flex-col text-black gap-1 pl-2">
                        <p className={"text-black font-normal"}>Epoch</p>
                        <h1 className={"text-[22px]"}>000,000</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-2 pt-4">
                    {/*Learning rate*/}
                    <Drawer>
                        <DrawerTrigger>
                            <Option
                                title={"Learning rate"}
                                items={["0.00001", "0.0001", "0.001", "0.01", "1", "0.003", "0.03", "0.3", "3", "10"]}/>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Learning Rate</DrawerTitle>
                                <DrawerDescription className={"text-black text-[16px]"}>
                                    <br/>
                                    <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                    <br/>
                                    The learning rate is a crucial setting that controls how much a neural network
                                    adjusts its internal weights in response to the error it makes during training.
                                    <br/>
                                    Think of it like the step size the model takes toward minimizing its mistakes.
                                    <br/>
                                    <div className={"flex flex-row gap-2"}>
                                        <Dot/>
                                        A small learning rate (e.g., 0.0001) means the model learns slowly but steadily,
                                        which can lead to more accurate results over time—though it may take longer to
                                        train.
                                    </div>
                                    <div className={"flex flex-row gap-2"}>
                                        <Dot/>
                                        A large learning rate (e.g., 1 or 10) speeds up learning, but if it's too large,
                                        the model might overshoot good solutions and fail to learn properly.
                                    </div>
                                    <br/>
                                    Choosing the right learning rate is a balance:
                                    <br/>
                                    <div className={"flex flex-row gap-2"}>
                                        <Brain color={"salmon"}/>
                                        Too small = slow and possibly stuck
                                    </div>
                                    <div className={"flex flex-row gap-2"}>
                                        <Zap color={"yellow"}/>
                                        Too big = fast but unstable
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                On NeuroVision, you can experiment with different learning rates to see how it affects
                                your model’s training and performance.
                                <br/><br/>
                                <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                <br/>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    {/*Activation*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Activation"}
                                               items={["ReLU", "Tanh", "Sigmoid", "Linear"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Activation Function</DrawerTitle>
                                <DrawerDescription className={"text-black text-[16px]"}>
                                    <div className={"border-t-2 border-indigo-800 px-2  py-1"}/>
                                    An activation function decides whether a neuron in a neural network should be
                                    "activated" or not. It adds non-linearity to the model, helping it learn complex
                                    patterns in data.
                                    <br/>
                                    Different functions behave in different ways:
                                    <br/><br/>
                                    <div className={"flex flex-row gap-20 pl-6"}>
                                        <div className={"flex flex-col gap-2"}>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>ReLU</span> (Rectified Linear Unit)
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: 0 if input is negative; otherwise, it returns the input.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Why use it? Fast and effective, especially for deep networks.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Popular for: Most modern architectures.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>Tanh</span> (Hyperbolic Tangent)
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: Values between -1 and 1.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Why use it? Useful when you want the data to be centered around 0.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Popular for: Networks where negative output matters.
                                            </div>
                                        </div>
                                        <div className={"flex flex-col gap-2"}>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>Sigmoid</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: Values between 0 and 1.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Why use it? Great for binary classification problems.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Popular for: Simple models or output layers in classifiers.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>Linear</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: The exact input value (no change).
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Why use it? Useful for regression tasks (e.g., predicting numbers).
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Popular for: Output layers in continuous value prediction.
                                            </div>
                                        </div>
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                Choosing the right activation function impacts how well and how fast your network
                                learns. Try switching them in NeuroVision to see how they affect your model’s behavior!
                                <br/><br/>
                                <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                <br/>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    {/*Regularization*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Regularization"} items={["None", "L1", "L2"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    {/*Regularization rate*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Regularization rate"}
                                               items={["0", "0.001", "0.01", "0.1", "1", "0.003", "0.03", "0.3", "3", "10"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    {/*Problem type*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Problem type"}
                                               items={["Classification", "Regression"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>


                </div>
            </div>
            <div className="flex flex-row items-center  justify-around gap-2 pt-4">
                <div className={"flex flex-col gap-4 "}>
                    <div className={"flex flex-col gap-2 w-[160px]"}>
                        <p className={"text-md pl-2"}>DATA</p>
                        <p className={"text-sm"}>Which dataset do you want to use?</p>
                        <div className={"flex flex-wrap gap-3 w-[100px] pl-2"}>
                            <Button className={" rounded-full px-4.5 hover:bg-indigo-300"}></Button>
                            <Button className={" rounded-full px-4.5 hover:bg-indigo-300"}></Button>
                            <Button className={" rounded-full px-4.5 hover:bg-indigo-300"}></Button>
                            <Button className={" rounded-full px-4.5 hover:bg-indigo-300"}></Button>
                        </div>
                    </div>
                    <Scrollable text1={"Ratio of training to test data: "} text2={"%"} min={10} max={90} defval={10}
                                step={10}/>
                    <Scrollable text1={"Noise: "} min={0} max={50} defval={0} step={5}/>
                    <Scrollable text1={"Batch size: "} min={1} max={30} defval={1} step={1}/>
                    <Button className={"w-[170px] rounded-full"}>REGENERATE</Button>
                </div>
                <div className={"flex flex-col justify-center"}>
                    <div className={"flex flex-row justify-between gap-60"}>

                    </div>
                    <NeuralNetworkEditor/>
                </div>
                <div className={"flex flex-col gap-2 w-[160px]"}>
                    <p className={"text-md pl-2"}>OUTPUT</p>
                    <p className={"text-sm"}>Test loss 0.433</p>
                    <p className={"text-sm"}>Training loss 0.418</p>
                </div>
            </div>

        </div>

    );
}
///

