import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('userid');
    const grid = searchParams.get('grid');
    const song = searchParams.get('song');
    const img = searchParams.get('img');

    try {
        if (!userid || !grid || !song || !img) throw new Error('userid & grid & song & img required');
        await sql`INSERT INTO Answers (userid, grid, song, img) 
                  VALUES (${userid}, ${grid}, ${song}, ${img});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const answers = await sql`SELECT * FROM Answers;`;
    return NextResponse.json({ answers }, { status: 200 });
}