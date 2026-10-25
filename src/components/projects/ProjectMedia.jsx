import { Image } from "lucide-react";

export default function ProjectMedia({ media, title, priority = false }) {
  if (!media?.src) {
    return (
      <div className="project-media project-media-placeholder" aria-label={`${title} preview placeholder`}>
        <div className="project-media-grid" aria-hidden="true" />
        <div className="project-media-orb project-media-orb-one" aria-hidden="true" />
        <div className="project-media-orb project-media-orb-two" aria-hidden="true" />
        <div className="project-media-placeholder-content">
          <Image aria-hidden="true" size={28} />
          <span>Project preview</span>
          <small>Media coming soon</small>
        </div>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        className="project-media"
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
      className="project-media"
      src={media.src}
      alt={media.alt ?? `${title} preview`}
      loading={priority ? "eager" : "lazy"}
      onError={(event) => {
        event.currentTarget.hidden = true;
        event.currentTarget.nextElementSibling?.removeAttribute("hidden");
      }}
    />
  );
}
