import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'

const songs2 = []

export default function SongSearch({ onSelect }) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState({})

    const filterSongs = () => {
        return filteredSongs2.map((person) => (
            <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                <div className="text-sm/6 text-black">{person.name}</div>
            </ComboboxOption>
        ))
    }

    const fetchSongs = (callback) => {
        axios
            .get(`https://api.deezer.com/search?q=${query}&order=RANKING`)
            .then(response => {
                console.log('searching w query ' + query)
                songs2.splice(0, songs2.length)
                if (query != '') {
                    let length = response.data.data.length
                    console.log('found ' + length)
                    // TODO: restrict length to only loop over maximum MAX_TABLE_VIEW items
                    for (let i = 0; i < length; i++) {
                        let name = response.data.data[i].title
                        let artist = response.data.data[i].artist.name
                        songs2.push({
                            id: response.data.data[i].id, name: name + ' - ' + artist, artist: artist,
                            searchtags: name, // TODO: decide on searchtags to use, currently just name
                            searchtags2: name,
                            img: response.data.data[i].album.cover_medium
                        })
                    }
                }
            })
            callback();
    }

    useEffect(() => {
        fetchSongs(filterSongs);
    })

    // TODO: On close modal, don't forget to clear songlist
    // TODO: slight delay before search and load

    const filteredSongs2 =
        query === ''
            ? songs2.splice(0, 5)
            : songs2.filter((song) => {
                return song.searchtags.toLowerCase().replace(/ +/g, "").includes(query.toLowerCase().replace(/ +/g, "")) ||
                    song.searchtags2.toLowerCase().replace(/ +/g, "").includes(query.toLowerCase().replace(/ +/g, ""))
            }).slice(0, 5)


    return (
        <div className="mx-auto h-full w-full pt-4">
            {/* change here */}
            <Combobox immediate value={selected} onChange={(value) => { setSelected(value); if(value!=null)console.log("selected + " + value.name); if(value!=null)onSelect(value.name, value.img) }} onClose={() => { setQuery(query) }} __demoMode>
                <div className="relative">
                    <ComboboxInput
                        spellCheck='false'
                        className={clsx(
                            'w-full rounded-lg border border-neutral-300 bg-slate-200 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        displayValue={(person) => person?.name}
                        onChange={(event) => { setQuery(event.target.value);}}
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
                    { filterSongs }
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}
