import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { author, title, content } = await req.json();
  const result = await prisma.blog.create({
    data: {
      author: author,
      title: title,
      content: content,
      date: new Date(),
    },
  });
  return NextResponse.json(result);
}

export async function GET() {
  const result = await prisma.blog.findFirst({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(result);
}
