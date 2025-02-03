import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await prisma.user.findMany();
  return NextResponse.json(result);
}
