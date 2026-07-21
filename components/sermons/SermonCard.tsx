import Image from "next/image";
import { Play } from "lucide-react";
import { formatFullDate } from "@/lib/format-date";
import { getYouTubeThumbnail } from "@/lib/youtube";
import type { Sermon } from "@/lib/database.types";

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  const thumbnail =
    sermon.thumbnail_url ||
    (sermon.youtube_url ? getYouTubeThumbnail(sermon.youtube_url) : null);

  const card = (
    <article className="group overflow-hidden rounded-sm border border-primary/10 bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-video bg-primary">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`Sermon: ${sermon.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Play size={48} className="text-accent" aria-hidden="true" />
          </div>
        )}
        {sermon.youtube_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/40">
            <Play
              size={48}
              className="text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        {sermon.series_name && (
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-accent">
            {sermon.series_name}
          </p>
        )}
        <h3 className="mt-1 text-lg font-semibold text-primary">
          {sermon.title}
        </h3>
        <p className="mt-1 text-sm text-primary/70">
          {formatFullDate(sermon.sermon_date)}
          {sermon.pastor && ` • ${sermon.pastor}`}
        </p>
      </div>
    </article>
  );

  if (!sermon.youtube_url) return card;

  return (
    <a
      href={sermon.youtube_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch sermon: ${sermon.title} on YouTube`}
    >
      {card}
    </a>
  );
}
