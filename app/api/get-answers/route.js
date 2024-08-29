import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log(request.url)
    try {
        const result =
            await sql`SELECT COUNT(userid), grid, song, COUNT(*) / SUM(COUNT(*)) OVER (PARTITION BY grid) as ViewPercentage
                      FROM Answers
                      GROUP BY grid, song;`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

}