'use client';

import Image from "next/image";
import Modal from "./ui/modal";
import { useState } from "react";
import { createPortal } from "react-dom";

const answers = [
    { row: 1, column: 1, answer: 'Euphoria - Muse'},
    { row: 1, column: 2, answer: 'euphoria - Kendrick Lamar'},
    { row: 1, column: 3, answer: 'euphoria - Kendrick Lamar'},
    { row: 2, column: 1, answer: 'euphoria - Kendrick Lamar'},
    { row: 2, column: 2, answer: 'euphoria - Kendrick Lamar'},
    { row: 2, column: 3, answer: 'euphoria - Kendrick Lamar'},
    { row: 3, column: 1, answer: 'euphoria - Kendrick Lamar'},
    { row: 3, column: 2, answer: 'euphoria - Kendrick Lamar'},
    { row: 3, column: 3, answer: 'euphoria - Kendrick Lamar'},
]

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [guess, setGuess] = useState();
    const [rowCategory, setRowCategory] = useState();
    const [colCategory, setColCategory] = useState();
    const [guesses, setGuesses] = useState(9);

    const checkGuess = (guess) => {
        let newAnswer = answers[-1 + colCategory + (rowCategory - 1) * 3].answer
        if (newAnswer == guess) {
            console.log('correct!!!s')
        } else {
            console.log('no, guessed ' + guess + ' coreect: ' + newAnswer)
        }
        setGuesses(guesses - 1)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-14">
            <div className="relative flex place-items-center text-slate-800 text-5xl font-semibold">
                SongGrid
            </div>
            
            <div className="">
                <main className="flex flex-col items-center relative text-[24x] w-[560px] h-[560px]">
                    <div className="grid grid-cols-[15%_25%_25%_25%_15%] grid-rows-[16%_28%_28%_28%] gap-0 w-full h-full text-[14px]">
                        <div className="text-center row-start-1 col-start-2 pb-5 px-2 flex items-center justify-center"><button>short category1</button></div>
                        <div className="text-center row-start-1 col-start-3 pb-5 px-2 flex items-center justify-center"><button>Long Category words words words2</button></div>
                        <div className="text-center row-start-1 col-start-4 pb-5 px-2 flex items-center justify-center"><button>Long Category words words words3</button></div>
                        <div className="text-center row-start-2 col-start-1 pr-9 px-2 flex items-center justify-center"><button>Long Category words words words4</button></div>
                        <div className="text-center row-start-3 col-start-1 pr-9 px-2 flex items-center justify-center"><button>short5</button></div>
                        <div className="text-center row-start-4 col-start-1 pr-9 px-2 flex items-center justify-center"><button>Longwordlong6</button></div>

                        <div className="row-start-2 col-start-2 border-t border-l border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(1), setColCategory(1)}}></div>
                        </div>
                        <div className="row-start-2 col-start-3 border border-b-0 border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(1), setColCategory(2)}}></div>
                        </div>
                        <div className="row-start-2 col-start-4 border-t border-r border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(1), setColCategory(3)}}></div>
                        </div>
                        <div className="row-start-3 col-start-2 border border-r-0 border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(2), setColCategory(1)}}></div>
                        </div>
                        <div className="row-start-3 col-start-3 border border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(2), setColCategory(2)}}></div>
                        </div>
                        <div className="row-start-3 col-start-4 border border-l-0 border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(2), setColCategory(3)}}></div>
                        </div>
                        <div className="row-start-4 col-start-2 border-b border-l border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(3), setColCategory(1)}}></div>
                        </div>
                        <div className="row-start-4 col-start-3 border border-t-0 border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(3), setColCategory(2)}}></div>
                        </div>
                        <div className="row-start-4 col-start-4 border-b border-r border-neutral-500">
                            <div className="w-full h-full block cursor-pointer bg-modal hover:bg-slate-300" onClick={() => {setShowModal(!showModal), setRowCategory(3), setColCategory(3)}}></div>
                        </div>

                        <div className="row-start-3 col-start-5 flex flex-col items-center justify-center text-center pl-20 h-full w-0 gap-2">
                            <div className="text-nowrap text-[16px]">Guesses left:</div>
                            <div className="text-[16px] font-semibold">{guesses}</div>
                            <button className="text-nowrap bg-red-100 rounded-md transition-colors duration-200 transform
                                hover:bg-red-300 pt-1 pb-1 px-2">give up?</button>
                        </div>
                    </div>

                    <div className="text-[14px] pt-4">Bottom main</div>
                </main>
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="text-[18px]">Footer</div>
            </div>

            



            {showModal && createPortal(<Modal open={showModal} onGuess={(guess) => {setGuess(guess); setShowModal(false);console.log("got guess: " + guess);checkGuess(guess)}} onClose={() => setShowModal(false)}></Modal>, document.body)}
        </div>
    );
}
