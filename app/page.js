'use client';

import Image from "next/image";
import Modal from "./ui/modal";
import LoseModal from "./ui/losemodal";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from 'axios';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { createPool } from '@vercel/postgres';
import { revalidatePath } from "next/cache";

const answers = [
    { row: 1, column: 1, answer: 'A Night To Remember - beabadoobee' },
    { row: 1, column: 2, answer: 'Glue Song - beabadoobee' },
    { row: 1, column: 3, answer: 'The Moon Song - beabadoobee' },
    { row: 2, column: 1, answer: 'From The Start - Laufey' },
    { row: 2, column: 2, answer: 'Sexy To Someone - Clairo' },
    { row: 2, column: 3, answer: 'She Likes Another Boy - Oscar Lang' },
    { row: 3, column: 1, answer: 'Falling Behind - Laufey' },
    { row: 3, column: 2, answer: 'bubble gum - Clairo' },
    { row: 3, column: 3, answer: 'fall into u - Oscar Lang' },
]

export default function Home() {
    // didn't know you can make states with objects LOL
    const [showModal, setShowModal] = useState(false);
    const [guess, setGuess] = useState();
    const [guessImage, setGuessImage] = useState("/images/willem.png")

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

    const [per, setPer] = useState("100%")
    const [per2, setPer2] = useState("100%")
    const [per3, setPer3] = useState("100%")
    const [per4, setPer4] = useState("100%")
    const [per5, setPer5] = useState("100%")
    const [per6, setPer6] = useState("100%")
    const [per7, setPer7] = useState("100%")
    const [per8, setPer8] = useState("100%")
    const [per9, setPer9] = useState("100%")

    const [row1] = useState("Artist: beabadoobee") // ??? why use state
    const [row2] = useState("Three or more\u00A0word title")
    const [row3] = useState("Double letter\u00A0title")
    const [col1] = useState("Artist: Laufey")
    const [col2] = useState("Artist: Clairo")
    const [col3] = useState("Artist: Oscar Lang")

    const [answers2, setAnswers2] = useState([]);

    const addAnswer = (userid, grid, song, img) => {
        let url = 'http://localhost:3000/api/add-answer?'
        axios.get(url + `userid=${userid}&grid=${grid}&song=${song}&img=${img}`)
            .then(response => {
                console.log(response)
            })
    }

    const checkGuess = (guess, img) => {
        let index = -1 + colCategory + (rowCategory - 1) * 3
        let newAnswer = answers[index].answer
        if (newAnswer.includes(guess)) {
            console.log('correct!!!s')
            addAnswer(20, index + 1, guess, img)
            switch (index + 1) {
                case 1:
                    setPer(getGridPercentageByGuess(1, guess))
                    setImg(img)
                    setShowImg(true);
                    break;
                case 2:
                    setPer2(getGridPercentageByGuess(2, guess))
                    setImg2(img)
                    setShowImg2(true);
                    break;
                case 3:
                    setPer3(getGridPercentageByGuess(3, guess))
                    setImg3(img)
                    setShowImg3(true);
                    break;
                case 4:
                    setPer4(getGridPercentageByGuess(4, guess))
                    setImg4(img)
                    setShowImg4(true);
                    break;
                case 5:
                    setPer5(getGridPercentageByGuess(5, guess))
                    setImg5(img)
                    setShowImg5(true);
                    break;
                case 6:
                    setPer6(getGridPercentageByGuess(6, guess))
                    setImg6(img)
                    setShowImg6(true);
                    break;
                case 7:
                    setPer7(getGridPercentageByGuess(7, guess))
                    setImg7(img)
                    setShowImg7(true);
                    break;
                case 8:
                    setPer8(getGridPercentageByGuess(8, guess))
                    setImg8(img)
                    setShowImg8(true);
                    break;
                case 9:
                    setPer9(getGridPercentageByGuess(9, guess))
                    setImg9(img)
                    setShowImg9(true);
                    break;
            }
            // getSongImage(guess, index)
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
                // let img = response.data.track.album.image[2]["#text"]
                let img = guessImage;
                //console.log(response.data.track.album.image[2]["#text"])
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

    const getRowCategory = () => {
        if (rowCategory == 1) return row1
        if (rowCategory == 2) return row2
        if (rowCategory == 3) return row3
    }

    const getColCategory = () => {
        if (colCategory == 1) return col1
        if (colCategory == 2) return col2
        if (colCategory == 3) return col3
    }

    const getNumCorrect = () => {
        let answer = 0;
        if (showImg) answer++;
        if (showImg2) answer++;
        if (showImg3) answer++;
        if (showImg4) answer++;
        if (showImg5) answer++;
        if (showImg6) answer++;
        if (showImg7) answer++;
        if (showImg8) answer++;
        if (showImg9) answer++;
        return answer;
    }

    const getGridPercentageByGuess = (grid, guess) => {
        console.log(answers2.data.result.rows)
        console.log("grid: " + grid) 
        console.log("guess: " + guess)
        let percentage = answers2.data.result.rows.find((element) =>  element.grid === grid && element.song == guess)
        if (percentage == undefined) percentage = 100
        else percentage = Math.ceil(percentage.viewpercentage * 100)
        console.log(percentage)
        // console.log(answers2.data.result.rows)
        return `${percentage}%`
    }

    const getAnswers = () => {
        let url = 'http://localhost:3000/api/get-answers'
        axios.get(url)
            .then(response => {
                console.log(response)
                setAnswers2(response);
            })
            .catch(error => {
                console.log('Error fetching answers' + error)
            })
    }
    useEffect(() => {
        getAnswers();
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-14">
            <div className="relative flex place-items-center text-slate-800 text-5xl font-semibold">
                SongGrid
            </div>
            <div className="">
                <main className="flex flex-col items-center relative text-[24x] w-[620px] h-[620px]">
                    <div className="grid grid-cols-[12.5%_25%_25%_25%_12.5%] grid-rows-[16%_28%_28%_28%] gap-0 w-full h-full text-[14px]">
                        <div className="text-center row-start-1 col-start-2 pb-1 px-2 flex items-center justify-center"><button>{col1}</button></div>
                        <div className="text-center row-start-1 col-start-3 pb-1 px-2 flex items-center justify-center"><button>{col2}</button></div>
                        <div className="text-center row-start-1 col-start-4 pb-1 px-2 flex items-center justify-center"><button>{col3}</button></div>
                        <div className="text-center row-start-2 col-start-1 pr-2 px-2 flex items-center justify-center w-0"><button>{row1}</button></div>
                        <div className="text-center row-start-3 col-start-1 pr-2 px-2 flex items-center justify-center w-0"><button>{row2}</button></div>
                        <div className="text-center row-start-4 col-start-1 pr-2 px-2 flex items-center justify-center w-0"><button>{row3}</button></div>

                        <div className="row-start-2 col-start-2 border-t border-l border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg ? "cursor-pointer" : null)} onClick={() => { if (!showImg) setShowModal(!showModal); setRowCategory(1); setColCategory(1) }}>
                                {showImg && <Image src={img} fill={true} alt="Song picture" />}
                                {showImg &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-2 col-start-3 border border-b-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg2 ? "cursor-pointer" : null)} onClick={() => { if (!showImg2) setShowModal(!showModal), setRowCategory(1), setColCategory(2) }}>
                                {showImg2 && <Image src={img2} fill={true} alt="Song picture" />}
                                {showImg2 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per2}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-2 col-start-4 border-t border-r border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg3 ? "cursor-pointer" : null)} onClick={() => { if (!showImg3) setShowModal(!showModal), setRowCategory(1), setColCategory(3) }}>
                                {showImg3 && <Image src={img3} fill={true} alt="Song picture" />}
                                {showImg3 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per3}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-2 border border-r-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg4 ? "cursor-pointer" : null)} onClick={() => { if (!showImg4) setShowModal(!showModal), setRowCategory(2), setColCategory(1) }}>
                                {showImg4 && <Image src={img4} fill={true} alt="Song picture" />}
                                {showImg4 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per4}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-3 border border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg5 ? "cursor-pointer" : null)} onClick={() => { if (!showImg5) setShowModal(!showModal), setRowCategory(2), setColCategory(2) }}>
                                {showImg5 && <Image src={img5} fill={true} alt="Song picture" />}
                                {showImg5 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per5}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-3 col-start-4 border border-l-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg6 ? "cursor-pointer" : null)} onClick={() => { if (!showImg6) setShowModal(!showModal), setRowCategory(2), setColCategory(3) }}>
                                {showImg6 && <Image src={img6} fill={true} alt="Song picture" />}
                                {showImg6 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per6}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-2 border-b border-l border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg7 ? "cursor-pointer" : null)} onClick={() => { if (!showImg7) setShowModal(!showModal), setRowCategory(3), setColCategory(1) }}>
                                {showImg7 && <Image src={img7} fill={true} alt="Song picture" />}
                                {showImg7 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per7}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-3 border border-t-0 border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg8 ? "cursor-pointer" : null)} onClick={() => { if (!showImg8) setShowModal(!showModal), setRowCategory(3), setColCategory(2) }}>
                                {showImg8 && <Image src={img8} fill={true} alt="Song picture" />}
                                {showImg8 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per8}</div>
                                    </div>}
                            </div>
                        </div>
                        <div className="row-start-4 col-start-4 border-b border-r border-neutral-500">
                            <div className={"w-full h-full block bg-modal hover:bg-slate-300 relative " + (!showImg9 ? "cursor-pointer" : null)} onClick={() => { if (!showImg9) setShowModal(!showModal), setRowCategory(3), setColCategory(3) }}>
                                {showImg9 && <Image src={img9} fill={true} alt="Song picture" />}
                                {showImg9 &&
                                    <div className="bg-neutral-100 relative w-[30%] rounded-br border-r border-b">
                                        <div className="relative text-center font-medium">{per9}</div>
                                    </div>}
                            </div>
                        </div>

                        <div className="row-start-3 col-start-5 flex flex-col items-center justify-center text-center pl-20 h-full w-0 gap-2">
                            <div className="text-nowrap text-[16px]">Guesses left:</div>
                            <div className="text-[16px] font-semibold">{guesses}</div>
                            <button className="text-nowrap bg-red-100 rounded-md transition-colors duration-200 transform
                                hover:bg-red-300 pt-1 pb-1 px-2" onClick={() => setShowLoseModal(true)}>give up?</button>
                        </div>
                    </div>

                    <div className="text-[14px] pt-4">No search by artist!</div>
                </main>
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div className="text-[18px]">Footer</div>
            </div>





            {showModal && createPortal(<Modal colCategory={getColCategory()} rowCategory={getRowCategory()} open={showModal} onGuess={(guess, img) => { setShowModal(false); console.log("got guess: " + guess); console.log("setguessimg"); checkGuess(guess, img) }} onClose={() => setShowModal(false)}></Modal>, document.body)}
            {showLoseModal && createPortal(<LoseModal open={showLoseModal} onClose={() => setShowLoseModal(false)} getCorrect={getNumCorrect()}></LoseModal>, document.body)}
        </div>
    );
}
