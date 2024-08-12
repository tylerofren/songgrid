import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get('userid');
    const grid = searchParams.get('grid');
    const song = searchParams.get('song');

    try {
        if (!userid || !grid || !song) throw new Error('userid & grid & song required');
        await sql`INSERT INTO Answers (userid, grid, song) 
                  VALUES (${userid}, ${grid}, ${song});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const answers = await sql`SELECT * FROM Answers;`;
    return NextResponse.json({ answers }, { status: 200 });
}