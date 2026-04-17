import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type RegisterPayload = {
  userId: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  theme?: "light" | "dark";
  role?: "user" | "admin";
};

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<RegisterPayload>;

  if (!payload.userId || !payload.email || !payload.name || !payload.username) {
    return NextResponse.json({ error: "Missing required registration fields." }, { status: 400 });
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  const profileRow = {
    id: payload.userId,
    email: payload.email,
    name: payload.name,
    username: payload.username.replace(/^@/, ""),
    avatarUrl: payload.avatarUrl ?? "",
    bio: payload.bio ?? "Curating a better reading stack.",
    theme: payload.theme ?? "light",
    role: payload.role ?? "user",
    updatedAt: new Date().toISOString(),
  };

  const profileResult = await client.from("profiles").upsert(profileRow, { onConflict: "id" });

  if (!profileResult.error) {
    return NextResponse.json({ ok: true, destination: "profiles" });
  }

  const fallbackResult = await client.auth.admin.updateUserById(payload.userId, {
    user_metadata: {
      name: payload.name,
      username: payload.username.replace(/^@/, ""),
      avatarUrl: payload.avatarUrl ?? "",
      bio: payload.bio ?? "Curating a better reading stack.",
      theme: payload.theme ?? "light",
    },
    app_metadata: {
      role: payload.role ?? "user",
    },
  });

  if (fallbackResult.error) {
    return NextResponse.json(
      {
        error: profileResult.error.message,
        fallbackError: fallbackResult.error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, destination: "auth.users" });
}
