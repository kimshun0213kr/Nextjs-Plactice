import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { tab: string } }
) {
  const { tab } = await params;
  const tabNumber = parseInt(tab, 10);
  if (!isNaN(parseInt(tab))) {
    const result = await prisma.blog.findMany({
      orderBy: {
        id: "desc",
      },
      skip: (tabNumber - 1) * 30,
      take: 30,
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json(
      { error: "クエリの形式が不正です。" },
      { status: 400 }
    );
  }
}
