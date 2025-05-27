'use client'

import Option from "@/components/options";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Brain, Diamond, Dot, Minus, Play, Plus, RotateCcw, SkipForward, Zap} from "lucide-react";
import Scrollable from "@/components/scrollable";
import NeuralNetworkEditor from "@/components/network-playground";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";


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
                    <div className="flex flex-col text-black gap-1 pl-6">
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
                                        <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                 fill={"indigo"}/>
                                        A small learning rate (e.g., 0.0001) means the model learns slowly but steadily,
                                        which can lead to more accurate results over time—though it may take longer to
                                        train.
                                    </div>
                                    <div className={"flex flex-row gap-2"}>
                                        <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                 fill={"indigo"}/>
                                        A large learning rate (e.g., 1 or 10) speeds up learning, but if it's too large,
                                        the model might overshoot good solutions and fail to learn properly.
                                    </div>
                                    <br/>
                                    Choosing the right learning rate is a balance:
                                    <br/>
                                    <div className={"flex flex-row gap-2"}>
                                        <Dot/>
                                        Too small = slow and possibly stuck
                                    </div>
                                    <div className={"flex flex-row gap-2"}>
                                        <Dot/>
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
                                <DrawerTitle>Regularization</DrawerTitle>
                                <DrawerDescription className={"text-black text-[16px]"}>
                                    <div className={"border-t-2 border-indigo-800 px-2  py-1"}/>
                                    Regularization is a technique used to prevent overfitting — when a neural network
                                    memorizes training data instead of learning to generalize. It works by adding a
                                    penalty to the model’s complexity,
                                    <br/>
                                    encouraging it to keep weights smaller and more balanced.
                                    <br/>
                                    <div className={"flex flex-row pt-1 pl-6"}>
                                        <div className={"flex flex-col gap-1"}>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>None</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                No regularization applied.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                The model may perform better on training data but risks overfitting.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-1"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}> L1 Regularization (Lasso)</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Adds the absolute value of weights to the loss function.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Encourages sparsity, meaning it can force some weights to become exactly
                                                zero.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Useful when you want a simpler model or feature selection.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-1"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>  L2 Regularization (Ridge)</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Adds the square of the weights to the loss function.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Encourages smaller weights overall, but rarely zeroes them out.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Helps smooth out the learning process and reduce overfitting.
                                            </div>
                                        </div>

                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                Try both L1 and L2 in NeuroVision to see how they influence training. L2 is more common,
                                but L1 can be powerful for creating sparse, efficient networks.
                                <br/><br/>
                                <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                <br/>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    {/*Regularization rate*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Regularization rate"}
                                               items={["0", "0.001", "0.01", "0.1", "1", "0.003", "0.03", "0.3", "3", "10"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Regularisation rate</DrawerTitle>
                                <DrawerDescription className={"text-black text-[16px]"}>
                                    <div className={"border-t-2 border-indigo-800 px-2  py-1"}/>
                                    The regularization rate controls how strongly the regularization penalty is applied
                                    during training.
                                    It works together with your selected regularization method (L1 or L2) to prevent
                                    overfitting by limiting the size or number of weights in the neural network.
                                    <br/>
                                    <div className={"flex flex-row pt-1 pl-6"}>
                                        <div className={"flex flex-col gap-1"}>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>How it works:</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                The regularization term is added to the loss function.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                This term is multiplied by the regularization rate.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                The higher the rate, the stronger the penalty on large weights.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-1"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>Example values:</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                0 → No regularization applied.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Small values (e.g., 0.001 or 0.01) → Light regularization: helps reduce
                                                overfitting without hurting performance too much.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Medium values (e.g., 0.1 or 0.3) → More aggressive: stronger push toward
                                                smaller weights or sparsity.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                High values (e.g., 1, 3, or 10) → Heavy regularization: may oversimplify
                                                the model, leading to underfitting.
                                            </div>
                                        </div>
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                Try increasing the regularization rate to encourage simpler, more generalizable models.
                                In NeuroVision, you can adjust the rate live and see how it affects your model’s
                                accuracy and behavior.
                                <br/><br/>
                                <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                <br/>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    {/*Problem type*/}
                    <Drawer>
                        <DrawerTrigger><Option title={"Problem type"}
                                               items={["Classification", "Regression"]}/></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Problem type</DrawerTitle>
                                <DrawerDescription className={"text-black text-[16px]"}>
                                    <div className={"border-t-2 border-indigo-800 px-2  py-1"}/>
                                    The problem type defines what kind of task your neural network is trying to solve.
                                    <br/>
                                    Choosing the right type is essential, as it determines how the network behaves, how
                                    the output is structured, and how performance is measured.
                                    <br/>
                                    <div className={"flex flex-row pt-1 pl-6"}>
                                        <div className={"flex flex-col gap-1"}>
                                            <div className={"flex flex-row align-middle gap-2"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}> Classification</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                The model learns to predict categories or labels.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Examples: "Is this image a cat or a dog?" / "What digit is in this
                                                handwriting?" / "Is this email spam or not?"
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: Discrete classes (e.g., "yes"/"no", "A"/"B"/"C").
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Common output activation: Sigmoid.
                                            </div>
                                            <div className={"flex flex-row align-middle gap-1"}>
                                                <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                         fill={"indigo"}/>
                                                <span className={"font-semibold"}>Regression</span>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                The model learns to predict continuous numeric values.
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Examples: "What is the price of this house?" / "How much will a user
                                                spend next month?" / "What is the temperature tomorrow?"
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Output: Real numbers (e.g., 3.14, 52.7).
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                <Dot/>
                                                Common output activation: Linear.
                                            </div>
                                        </div>
                                    </div>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                Pick classification when the answer is a label, and regression when the answer is a
                                number.
                                <br/><br/>
                                <div className={"border-t-2 border-indigo-800 px-2 py-1"}/>
                                <br/>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
            <div className="flex flex-row items-center  justify-around gap-2 pt-4">
                <div className={"flex flex-col gap-4 "}>
                    <div className={"flex flex-col gap-2 w-[160px]"}>
                        <Dialog>
                            <DialogTrigger className={"text-start"}>
                                <p className={"text-md pl-2"}>DATA</p>
                                <p className={"text-sm"}>Which dataset do you want to use?</p>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Data</DialogTitle>
                                    <DialogDescription className={"text-black text-[14px]"}>
                                        This panel lets you control how your dataset is generated and used for training your neural network.
                                        <br/>
                                        The choices here affect how well the model can learn and how realistically it reflects real-world conditions.
                                        <br/>
                                        <div className={"flex flex-row align-middle gap-1"}>
                                            <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                     fill={"indigo"}/>
                                            <span className={"font-semibold"}>Dataset Selection</span>
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Choose a pattern of points that defines how data is spread across the space.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            <span className={"font-semibold"}>Plane:</span>
                                            A simple, flat distribution of points, often linearly separable.
                                            Ideal for testing basic models or understanding core behaviors like overfitting and underfitting.
                                            Great starting point for beginners or when testing different feature combinations and learning parameters.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            <span className={"font-semibold"}>Multi</span><span className={"font-semibold"}>gaussian:</span>
                                            A simple, flat distribution of points, often linearly separable.
                                            Ideal for testing basic models or understanding core behaviors like overfitting and underfitting.
                                            Great starting point for beginners or when testing different feature combinations and learning parameters.
                                        </div>

                                        <div className={"flex flex-row align-middle gap-2"}>
                                            <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                     fill={"indigo"}/>
                                            <span className={"font-semibold"}>Ratio of Training to Test Data</span>
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Controls how much of your data is used to train the model versus how much is used to test it.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Example: 40% means 40% training and 60% testing.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            A higher training ratio can help learning, but too high means less data to evaluate performance.
                                        </div>

                                        <div className={"flex flex-row align-middle gap-2"}>
                                            <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                     fill={"indigo"}/>
                                            <span className={"font-semibold"}>Noise</span>
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Adds random variation to the data.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Simulates real-world imperfections or measurement errors.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Higher noise = messier data = harder learning challenge.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Useful for testing model robustness.
                                        </div>

                                        <div className={"flex flex-row align-middle gap-2"}>
                                            <Diamond className={"mt-2 ml-2"} width={10} height={10} color={"indigo"}
                                                     fill={"indigo"}/>
                                            <span className={"font-semibold"}>Batch Size</span>
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Determines how many examples are shown to the model at once during each training step.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Small batch sizes = noisier but more frequent updates.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Large batch sizes = more stable learning but slower updates.
                                        </div>
                                        <div className={"flex flex-row gap-2"}>
                                            <Dot/>
                                            Example: 21 means the model processes 21 samples at a time.
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>


                        <div className={"flex flex-wrap gap-3 w-[100px] pl-2"}>
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



