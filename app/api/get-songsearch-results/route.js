import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');


    if (!query) throw new Error('query required');
    const response = await axios.get(`https://api.deezer.com/search?q=${query}&order=RANKING`).then((res) => {
        return res.data
    })
    return NextResponse.json(response);
}