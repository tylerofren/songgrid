import axios from 'axios';
import { useState, useEffect } from 'react';

let nextId = 0; // ? makes happy i guess

export default function LoseModal({ onClose, getCorrect }) {
    const [answers, setAnswers] = useState([]);

    const getAnswers = () => {
        let url = 'http://localhost:3000/api/get-answers'
        axios.get(url)
            .then(response => {
                console.log(response.data.result.rows)
                const newAnswers = response.data.result.rows.map(row => ({
                    id: nextId++,
                    grid: row.grid,
                    song: row.song,
                    viewpercentage: row.viewpercentage
                }));
                setAnswers(newAnswers);
            })
            .catch(error => {
                console.log('Error fetching answers' + error)
            })
    }
    useEffect(() => {
        getAnswers();
    }, [])

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div><div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"><div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start justify-center items-center">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <div className="mt-2 flex flex-col justify-center pt-2">
                                    <p className="text-sm text-center text-gray-500">You got { getCorrect } / 9 correct</p>
                                    <div>Statistics:
                                        <ul>
                                        {answers.map(answer => (
                                            <li key={answer.id}>{answer.grid} : {answer.song} : {answer.viewpercentage}</li>
                                        ))}
                                        </ul>
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
