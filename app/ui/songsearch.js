import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const songs = [
    { id: 1, name: 'Mo bamba' },
    { id: 2, name: 'Fortnite' },
    { id: 3, name: 'Sickomode' },
    { id: 4, name: 'Beepboop' },
    { id: 5, name: 'DevonWebb' },
    { id: 6, name: 'DevonWebb' },
    { id: 7, name: 'DevonWebb' },
    { id: 8, name: 'DevonWebb' },
    { id: 9, name: 'DevonWebb' },
    { id: 10, name: 'DevonWebb' },
    { id: 11, name: 'DevonWebb' },
    { id: 12, name: 'DevonWebb' },
    { id: 13, name: 'DevonWebb' },
    { id: 14, name: 'DevonWebb' },
    { id: 15, name: 'DevonWebb' },
    { id: 16, name: 'DevonWebb' },
    { id: 17, name: 'DevonWebb' },
    { id: 18, name: 'DevonWebb' },
    { id: 19, name: 'DevonWebb' },
]

export default function SongSearch() {
    const [query, setQuery] = useState('  ')
    const [selected, setSelected] = useState()

    const filteredSongs =
        query === ''
            ? songs.slice(0, 8)
            : songs.filter((song) => {
                return song.name.toLowerCase().includes(query.toLowerCase())
            }).slice(0, 8)

    // const getRace = async () => {
    //     await axios
    //         .get('http://ergast.com/api/f1/current/last/results.json')
    //         .then(response => {
    //             console.log(response)
    //         })
    // }
    // useEffect(() => {
    //     getRace()
    // }, [])

    return (
        <div className="mx-auto h-full w-full pt-4">
            <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')} __demoMode>
                <div className="relative">
                    <ComboboxInput
                        spellCheck='false'
                        className={clsx(
                            'w-full rounded-lg border border-neutral-300 bg-slate-200 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        displayValue={(person) => person?.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-black group-data-[hover]:fill-black" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-neutral-300 bg-slate-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-40'
                    )}
                >
                    {filteredSongs.map((person) => (
                        <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                            <div className="text-sm/6 text-black">{person.name}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}
