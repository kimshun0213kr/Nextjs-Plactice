import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await prisma.blog.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(result);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { title, content } = await req.json();
  const result = await prisma.blog.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: title,
      content: content,
    },
  });
  return NextResponse.json(result);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const result = await prisma.blog.delete({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(result);
}
