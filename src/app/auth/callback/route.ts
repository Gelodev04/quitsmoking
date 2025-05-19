import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect(
          new URL("/?error=auth", requestUrl.origin)
        );
      }

      // Verify session was created
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        console.error("No session after code exchange");
        return NextResponse.redirect(
          new URL("/?error=no-session", requestUrl.origin)
        );
      }

      console.log("Successfully authenticated user:", session.user.email);
      return NextResponse.redirect(new URL("/trash", requestUrl.origin));
    }

    console.error("No code provided in callback");
    return NextResponse.redirect(new URL("/?error=no-code", requestUrl.origin));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/?error=unknown", request.url));
  }
}
