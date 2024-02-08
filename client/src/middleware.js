import { NextResponse } from 'next/server'

export function middleware(request) {
    console.log("middleware executed!")
    const allCookies = request.cookies.getAll();
    const token = allCookies.find((cookie) => cookie.name === "access_token")?.value
    console.log(token)

    if (token) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: [
        '/text',
        '/video/:path*'
    ]
}