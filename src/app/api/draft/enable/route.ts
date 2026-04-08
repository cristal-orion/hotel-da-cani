import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug") || "/";

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(slug);
}
