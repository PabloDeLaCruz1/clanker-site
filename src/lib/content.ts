import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MarkdownDoc = {
  data: Record<string, string>;
  content: string;
};

export async function getMarkdownDoc(fileName: string): Promise<MarkdownDoc> {
  const fullPath = path.join(CONTENT_DIR, fileName);
  const raw = await fs.readFile(fullPath, "utf8");
  const parsed = matter(raw);

  return {
    data: parsed.data as Record<string, string>,
    content: parsed.content,
  };
}
