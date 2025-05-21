import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get the current user
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;

    // Delete from payment_tracking
    const { error: trackingError } = await supabase
      .from("payment_tracking")
      .delete()
      .eq("user_id", userId);

    if (trackingError) {
      console.error("Error deleting payment tracking:", trackingError);
      return NextResponse.json(
        {
          error: `Failed to delete payment tracking: ${trackingError.message}`,
        },
        { status: 500 }
      );
    }

    // Delete the user account using the regular method
    const { error: deleteError } = await supabase.auth.signOut();
    if (deleteError) {
      console.error("Error signing out:", deleteError);
      return NextResponse.json(
        { error: `Failed to sign out: ${deleteError.message}` },
        { status: 500 }
      );
    }

    // Delete the user's data from auth.users
    const { error: userDeleteError } = await supabase.rpc("delete_user", {
      user_id: userId,
    });

    if (userDeleteError) {
      console.error("Error deleting user:", userDeleteError);
      return NextResponse.json(
        { error: `Failed to delete user account: ${userDeleteError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in delete account route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
