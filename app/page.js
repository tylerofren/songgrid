'use client';

import Image from "next/image";
import Modal from "./ui/modal";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex min-h-screen flex-col items-start justify-start p-14">
            <div className="relative flex place-items-center text-slate-800 dark:text-slate-100 text-5xl font-semibold">
                SongGrid
            </div>

            <div className="pt-8">
                <div>Coming Soon</div>
                <div>A daily guessing game for songs!</div>
                
            </div>

            <div className="underline"><a href="https://github.com/tylerofren" target="_blank">Github</a></div>
        </div>
    );
}
