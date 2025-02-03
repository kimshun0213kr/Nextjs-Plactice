import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(result);
}
