import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type PromotePayload = {
  email: string;
};

function isAdmin(user: User | null | undefined) {
  return Boolean(user?.app_metadata?.role === "admin");
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  const payload = (await request.json()) as Partial<PromotePayload>;
  if (!payload.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase admin client is not configured." }, { status: 500 });
  }

  const { data: userResult, error: userError } = await client.auth.getUser(token);
  if (userError || !isAdmin(userResult.user)) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { data, error } = await client.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const target = data.users.find((item) => item.email?.toLowerCase() === payload.email?.toLowerCase());
  if (!target) {
    return NextResponse.json({ error: "No matching user found." }, { status: 404 });
  }

  const updateResult = await client.auth.admin.updateUserById(target.id, {
    app_metadata: {
      ...(target.app_metadata ?? {}),
      role: "admin",
    },
  });

  if (updateResult.error) {
    return NextResponse.json({ error: updateResult.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
