import { Image } from "lucide-react";

export default function ProjectMedia({ media, title, priority = false }) {
  if (!media?.src) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-[#07080d] p-6 text-center text-[#7a8296]"
        aria-label={`${title} preview placeholder`}
      >
        <div className="flex flex-col items-center gap-2">
          <Image aria-hidden="true" size={24} className="text-[#a3a9b8]" />
          <span className="mono-font text-xs">Preview coming soon</span>
        </div>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        src={media.src}
        aria-label={media.alt ?? `${title} preview`}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
      />
    );
  }

  return (
    <img
      className="h-full w-full object-cover"
      src={media.src}
      alt={media.alt ?? `${title} preview`}
      loading={priority ? "eager" : "lazy"}
      onError={(event) => {
        event.currentTarget.hidden = true;
        const fallback = event.currentTarget.nextElementSibling;
        if (fallback) fallback.removeAttribute("hidden");
      }}
    />
  );
}
