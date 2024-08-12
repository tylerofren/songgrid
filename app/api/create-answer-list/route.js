import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const result =
            await sql`CREATE TABLE Answers ( userid varchar(255), grid int, song varchar(255) );`;
            // await sql`DROP TABLE Answers;`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}