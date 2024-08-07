import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

const songs2 = []

export default function SongSearch({ onSelect }) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState({})

    const fetchSongs = () => {
        axios
            .get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=93b076b0e136a204f45a69292934aade&format=json`)
            .then(response => {
                console.log('searching w query ' + query)

                songs2.splice(0, songs2.length)
                if (query != '') {
                    let length = Object.keys(response.data.results.trackmatches.track).length
                    console.log('found ' + length)
                    for (let i = 0; i < length; i++) {
                        let name = response.data.results.trackmatches.track[i].name
                        let artist = response.data.results.trackmatches.track[i].artist
                        songs2.push({
                            id: name + ' - ' + artist, name: name + ' - ' + artist, artist: artist,
                            searchtags: response.data.results.trackmatches.track[i].name + response.data.results.trackmatches.track[i].artist,
                            searchtags2: artist + name
                        })
                    }
                }
            })
    }

    // On close modal, don't forget to clear songlist
    fetchSongs()

    const filteredSongs2 =
        query === ''
            ? songs2.splice(0, 8)
            : songs2.filter((song) => {
                return song.searchtags.toLowerCase().replace(/ +/g, "").includes(query.toLowerCase().replace(/ +/g, "")) ||
                    song.searchtags2.toLowerCase().replace(/ +/g, "").includes(query.toLowerCase().replace(/ +/g, ""))
            }).slice(0, 8)


    return (
        <div className="mx-auto h-full w-full pt-4">
            <Combobox immediate value={selected} onChange={(value) => { setSelected(value);console.log("selected + " + value.id);onSelect(value.id) }} onClose={() => { setQuery(query) }} __demoMode>
                <div className="relative">
                    <ComboboxInput
                        spellCheck='false'
                        className={clsx(
                            'w-full rounded-lg border border-neutral-300 bg-slate-200 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        displayValue={(person) => person?.name}
                        onChange={(event) => { setQuery(event.target.value); fetchSongs() }}
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
                    {filteredSongs2.map((person) => (
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
