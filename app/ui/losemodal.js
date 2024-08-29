import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from "next/image";

let nextId = 0; // ? makes happy i guess

export default function LoseModal({ onClose, getCorrect }) {
    const [topAnswers, setTopAnswers] = useState([]);
    const [botAnswers, setBotAnswers] = useState([]);

    const getTopAnswers = () => {
        let url = 'https://songgrids.vercel.app/api/get-top-answers'
        axios.get(url)
            .then(response => {
                console.log(response.data.result.rows)
                const newAnswers = response.data.result.rows.map(row => ({
                    id: nextId++,
                    grid: row.grid,
                    song: row.song,
                    viewpercentage: Math.ceil(row.viewpercentage * 100),
                    img: row.img
                }));
                setTopAnswers(newAnswers);
            })
            .catch(error => {
                console.log('Error fetching answers' + error)
            })
    }
    const getBotAnswers = () => {
        let url = 'https://songgrids.vercel.app/api/get-bot-answers'
        axios.get(url)
            .then(response => {
                console.log(response.data.result.rows)
                const newAnswers = response.data.result.rows.map(row => ({
                    id: nextId++,
                    grid: row.grid,
                    song: row.song,
                    viewpercentage: Math.ceil(row.viewpercentage * 100),
                    img: row.img
                }));
                setBotAnswers(newAnswers);
            })
            .catch(error => {
                console.log('Error fetching answers' + error)
            })
    }
    useEffect(() => {
        getTopAnswers();
        getBotAnswers();
    }, [])

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div><div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start justify-center items-center">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <div className="mt-2 flex flex-col justify-center pt-2">
                                    <p className="text-md text-center text-gray-500 pb-2 font-semibold">You got {getCorrect} / 9 correct !</p>
                                    <div className="text-center text-lg pt-2 font-semibold">Most Popular Correct Guesses</div>
                                    <div className="flex justify-center pt-2">
                                        <div className="grid w-64 h-64 border">
                                            {topAnswers.map(answer => (
                                                <div key={answer.id} className={"row-start-" + Math.ceil(answer.grid / 3) + " col-start-" + answer.grid % 3}>
                                                    <div className="w-full h-full block bg-modal relative border group">
                                                        <Image src={answer.img} fill={true} alt="Song picture"/>
                                                        <div className="bg-neutral-100 absolute w-[40%] rounded-br border-r border-b">
                                                            <div className="relative text-center font-medium text-[10px]">{answer.viewpercentage}%</div>
                                                        </div>
                                                        <div className="absolute w-full h-full" title="asdf"></div>
                                                        <div className="bg-neutral-100 absolute rounded-br border-r border-b hidden group-hover:block">
                                                            <div className="relative text-center font-medium text-[10px]">{answer.song}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center text-lg pt-2 font-semibold">Rarest Correct Guesses</div>
                                    <div className="flex justify-center pt-2">
                                        <div className="grid w-64 h-64 border">
                                            {botAnswers.map(answer => (
                                                <div key={answer.id} className={"row-start-" + Math.ceil(answer.grid / 3) + " col-start-" + answer.grid % 3}>
                                                    <div className="w-full h-full block bg-modal relative border border-slate-400 group">
                                                        <Image src={answer.img} fill={true} alt="Song picture" />
                                                        <div className="bg-neutral-100 absolute w-[40%] rounded-br border-r border-b">
                                                            <div className="relative text-center font-medium text-[10px]">{answer.viewpercentage}%</div>
                                                        </div>
                                                        <div className="bg-neutral-100 absolute rounded-br border-r border-b hidden group-hover:block">
                                                            <div className="relative text-center font-medium text-[10px]">{answer.song}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {/* <button onClick={console.log(answers)} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Close</button> */}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
