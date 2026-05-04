import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_FILE = resolve(__dirname, "../../1mil cups lakeland.png");
const TITLE_MATCH = "Million Cups";

async function main() {
  const prisma = new PrismaClient();

  const series = await prisma.event.findFirst({
    where: { title: { contains: TITLE_MATCH, mode: "insensitive" } },
    select: { id: true, title: true, recurrenceGroupId: true },
  });

  if (!series) {
    throw new Error(`No event found matching "${TITLE_MATCH}"`);
  }
  if (!series.recurrenceGroupId) {
    throw new Error(
      `Event "${series.title}" has no recurrenceGroupId — not a recurring series`
    );
  }

  console.log(
    `Found series: "${series.title}" (group ${series.recurrenceGroupId})`
  );

  const file = await readFile(SOURCE_FILE);
  console.log(`Read ${file.length} bytes from ${SOURCE_FILE}`);

  const { url } = await put("1mil-cups-lakeland.png", file, {
    access: "public",
    addRandomSuffix: true,
    contentType: "image/png",
  });
  console.log(`Uploaded to Vercel Blob: ${url}`);

  const result = await prisma.eventPhoto.updateMany({
    where: { event: { recurrenceGroupId: series.recurrenceGroupId } },
    data: { url },
  });
  console.log(`Updated ${result.count} EventPhoto rows`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
