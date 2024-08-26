'use server'

import { cookies } from 'next/headers'

async function create(data) {
    cookies().set({
        name: 'name',
        value: 'lee',
        id: crypto.randomUUID(),
        httpOnly: true,
        path: '/',
      })
}