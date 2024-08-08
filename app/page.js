'use client';

import Image from "next/image";
import Modal from "./ui/modal";
import LoseModal from "./ui/losemodal";
import { useState } from "react";
import { createPortal } from "react-dom";
import axios from 'axios'

const answers = [
    { row: 1, column: 1, answer: 'Euphoria - Muse' },
    { row: 1, column: 2, answer: ['euphoria - Kendrick Lamar', 'Euphoria - Muse'] },
    { row: 1, column: 3, answer: 'euphoria - Kendrick Lamar' },
    { row: 2, column: 1, answer: 'euphoria - Kendrick Lamar' },
    { row: 2, column: 2, answer: 'euphoria - Kendrick Lamar' },
    { row: 2, column: 3, answer: 'euphoria - Kendrick Lamar' },
    { row: 3, column: 1, answer: 'euphoria - Kendrick Lamar' },
    { row: 3, column: 2, answer: 'euphoria - Kendrick Lamar' },
    { row: 3, column: 3, answer: 'euphoria - Kendrick Lamar' },
]

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [guess, setGuess] = useState();
    const [rowCategory, setRowCategory] = useState();
    const [colCategory, setColCategory] = useState();
    const [guesses, setGuesses] = useState(9);
    const [showImg, setShowImg] = useState(false);
    const [showImg2, setShowImg2] = useState(false);
    const [showImg3, setShowImg3] = useState(false);
    const [showImg4, setShowImg4] = useState(false);
    const [showImg5, setShowImg5] = useState(false);
    const [showImg6, setShowImg6] = useState(false);
    const [showImg7, setShowImg7] = useState(false);
    const [showImg8, setShowImg8] = useState(false);
    const [showImg9, setShowImg9] = useState(false);
    const [showLoseModal, setShowLoseModal] = useState(false);

    const [img, setImg] = useState("/images/willem.png"); // replace with loading image
    const [img2, setImg2] = useState("/images/willem.png");
    const [img3, setImg3] = useState("/images/willem.png");
    const [img4, setImg4] = useState("/images/willem.png");
    const [img5, setImg5] = useState("/images/willem.png");
    const [img6, setImg6] = useState("/images/willem.png");
    const [img7, setImg7] = useState("/images/willem.png");
    const [img8, setImg8] = useState("/images/willem.png");
    const [img9, setImg9] = useState("/images/willem.png");

    const checkGuess = (guess) => {
        let index = -1 + colCategory + (rowCategory - 1) * 3
        let newAnswer = answers[index].answer
        if (newAnswer.includes(guess)) {
            console.log('correct!!!s')
            switch (index + 1) {
                case 1:
                    setShowImg(true);
                    break;
                case 2:
                    setShowImg2(true);
                    break;
                case 3:
                    setShowImg3(true);
                    break;
                case 4:
                    setShowImg4(true);
                    break;
                case 5:
                    setShowImg5(true);
                    break;
                case 6:
                    setShowImg6(true);
                    break;
                case 7:
                    setShowImg7(true);
                    break;
                case 8:
                    setShowImg8(true);
                    break;
                case 9:
                    setShowImg9(true);
                    break;
            }
            getSongImage(guess, index)
            if (showImg && showImg2 && showImg3 && showImg4 && showImg5 && showImg6 && showImg7 && showImg8 && showImg9) setShowLoseModal(true)
        } else {
            console.log('no, guessed ' + guess + ' coreect: ' + newAnswer)
        }
        setGuesses(guesses - 1)
        if (guesses == 1) {
            setShowLoseModal(true)
        }
    }

    const getSongImage = (correctGuess, index) => {
        
        let track = correctGuess.split(' - ')[0]
        let artist = correctGuess.split(' - ')[1]
        axios
            .get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=93b076b0e136a204f45a69292934aade&artist=${artist}&track=${track}&format=json`)
            .then(response => {
                let img = response.data.track.album.image[2]["#text"]
                console.log(response.data.track.album.image[2]["#text"])
                switch (index + 1) {
                    case 1:
                        setImg(img);
                        break;
                    case 2:
                        setImg2(img);
                        break;
                    case 3:
                        setImg3(img);
                        break;
                    case 4:
                        setImg4(img);
                        break;
                    case 5:
                        setImg5(img);
                        break;
                    case 6:
                        setImg6(img);
                        break;
                    case 7:
                        setImg7(img);
                        break;
                    case 8:
                        setImg8(img);
                        break;
                    case 9:
                        setImg9(img);
                        break;
                }
            })
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
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg ? "cursor-pointer" : null)} onClick={() => { if(!showImg)setShowModal(!showModal); setRowCategory(1); setColCategory(1) }}>
                                {showImg && <Image src={img} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-2 col-start-3 border border-b-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg2 ? "cursor-pointer" : null)} onClick={() => { if(!showImg2)setShowModal(!showModal), setRowCategory(1), setColCategory(2) }}>
                                {showImg2 && <Image src={img2} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-2 col-start-4 border-t border-r border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg3 ? "cursor-pointer" : null)} onClick={() => { if(!showImg3)setShowModal(!showModal), setRowCategory(1), setColCategory(3) }}>
                                {showImg3 && <Image src={img3} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-2 border border-r-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg4 ? "cursor-pointer" : null)} onClick={() => { if(!showImg4)setShowModal(!showModal), setRowCategory(2), setColCategory(1) }}>
                                {showImg4 && <Image src={img4} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-3 border border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg5 ? "cursor-pointer" : null)} onClick={() => { if(!showImg5)setShowModal(!showModal), setRowCategory(2), setColCategory(2) }}>
                                {showImg5 && <Image src={img5} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-4 border border-l-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg6 ? "cursor-pointer" : null)} onClick={() => { if(!showImg6)setShowModal(!showModal), setRowCategory(2), setColCategory(3) }}>
                                {showImg6 && <Image src={img6} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-2 border-b border-l border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg7 ? "cursor-pointer" : null)} onClick={() => { if(!showImg7)setShowModal(!showModal), setRowCategory(3), setColCategory(1) }}>
                                {showImg7 && <Image src={img7} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-3 border border-t-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg8 ? "cursor-pointer" : null)} onClick={() => { if(!showImg8)setShowModal(!showModal), setRowCategory(3), setColCategory(2) }}>
                                {showImg8 && <Image src={img8} fill={true} alt="Song picture" />}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-4 border-b border-r border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg9 ? "cursor-pointer" : null)} onClick={() => { if(!showImg9)setShowModal(!showModal), setRowCategory(3), setColCategory(3) }}>
                                {showImg9 && <Image src={img9} fill={true} alt="Song picture" />}
                            </div>
                        </div>

                        <div className="row-start-3 col-start-5 flex flex-col items-center justify-center text-center pl-20 h-full w-0 gap-2">
                            <div className="text-nowrap text-[16px]">Guesses left:</div>
                            <div className="text-[16px] font-semibold">{guesses}</div>
                            <button className="text-nowrap bg-red-100 rounded-md transition-colors duration-200 transform
                                hover:bg-red-300 pt-1 pb-1 px-2" onClick={() => setShowLoseModal(true)}>give up?</button>
                        </div>
                    </div>

                    <div className="text-[14px] pt-4">Bottom main</div>
                </main>
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="text-[18px]">Footer</div>
            </div>





            {showModal && createPortal(<Modal open={showModal} onGuess={(guess) => { setGuess(guess); setShowModal(false); console.log("got guess: " + guess); checkGuess(guess) }} onClose={() => setShowModal(false)}></Modal>, document.body)}
            {showLoseModal && createPortal(<LoseModal open={showLoseModal} onClose={() => setShowLoseModal(false)}></LoseModal>, document.body)}
        </div>
    );
}
