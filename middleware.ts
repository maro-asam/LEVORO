import { NextResponse, type NextRequest } from "next/server"

const DASHBOARD_PREFIX = "/dashboard"
const LOGIN_PATH = "/admin/login"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith(DASHBOARD_PREFIX)) {
    return NextResponse.next()
  }

  // مؤقتًا عشان التطوير مايتعطلش.
  // في production لازم يبقى فيه login حقيقي.
  const authDisabled =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_DASHBOARD_AUTH_DISABLED === "true"

  if (authDisabled) {
    return NextResponse.next()
  }

  const session = request.cookies.get("levoro_admin_session")?.value

  if (!session) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = LOGIN_PATH
    loginUrl.searchParams.set("next", pathname)

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
