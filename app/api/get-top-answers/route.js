import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    console.log(request.url)
    try {
        const result =
            await sql`SELECT DISTINCT ON (grid) COUNT(userid), grid, song, COUNT(*) / SUM(COUNT(*)) OVER (PARTITION BY grid) as ViewPercentage, img
                      FROM Answers
                      GROUP BY grid, song, img
                      ORDER BY grid, count DESC`;

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}