'use client'

import Option from "@/components/options";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Minus, Play, Plus, RotateCcw, SkipForward} from "lucide-react";
import Scrollable from "@/components/scrollable";
import NeuralNetworkEditor from "@/components/test";


export default function Home() {
  return (
      <div>
        <div className="flex pt-3 justify-around shadow-xl py-1 ">
            <div className="flex items-center justify-center gap-2 pl-2">
                <Button className={"bg-transparent py-5.5 rounded-full hover:bg-indigo-300"}>
                    <RotateCcw  className={"size-5 text-black"}/>
                </Button>
                <Button className={"bg-indigo-800 py-6.5 rounded-full hover:bg-indigo-950"}>
                    <Play  className={"size-7 text-white  fill-white"}/>
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
              <Option title={"Learning rate"} items={["0.00001", "0.0001", "0.001", "0.01", "1", "0.003", "0.03", "0.3", "3", "10"]}/>
              <Option title={"Activation"} items={["ReLU", "Tanh", "Sigmoid", "Linear"]}/>
              <Option title={"Regularization"} items={["None", "L1", "L2"]}/>
              <Option title={"Regularization rate"} items={["0", "0.001", "0.01", "0.1", "1", "0.003", "0.03", "0.3", "3", "10"]}/>
              <Option title={"Problem type"} items={["Classification", "Regression"]}/>
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
                  <Scrollable text1={"Ratio of training to test data: "} text2={"%"} min={10} max={90} defval={10} step={10}/>
                  <Scrollable text1={"Noise: "} min={0} max={50} defval={0} step={5}/>
                  <Scrollable text1={"Batch size: "} min={1} max={30} defval={1} step={1}/>
                  <Button className={"w-[170px] rounded-full"}>REGENERATE</Button>
              </div>
              <div className={"flex flex-col justify-center"}>
                  <div className={"flex flex-row justify-between gap-60"}>
                      {/*<div className={"flex flex-col gap-2 w-[160px]"}>*/}
                      {/*    <p className={"text-md pl-2"}>FEATURES</p>*/}
                      {/*    <p className={"text-sm"}>Which properties do you want to feed in?</p>*/}

                      {/*</div>*/}
                      <div className={"flex flex-col gap-2  w-full px-20"}>
                          <p className={"text-md self-center pl-2"}>HIDDEN LAYERS</p>
                          <div className={" border-x-2 border-t-2 border-indigo-800 h-4"}></div>
                      </div>
                  </div>
                  <NeuralNetworkEditor/>
              {/*    <ReactFlowProvider>*/}

              {/*      <Testplace/>*/}
              {/*    </ReactFlowProvider>*/}
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

