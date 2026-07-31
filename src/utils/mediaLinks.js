export const toEmbedUrl = (href) => {
  const youtubeStandardUrlMatch = href.match(
    /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i,
  );
  const youtuShortUrlMatch = href.match(
    /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/i,
  );

  if (youtubeStandardUrlMatch) {
    return `https://www.youtube.com/embed/${youtubeStandardUrlMatch[1]}`;
  }

  if (youtuShortUrlMatch) {
    return `https://www.youtube.com/embed/${youtuShortUrlMatch[1]}`;
  }

  return href;
};
