export default function SocialShare({ url, title }) {
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="social-share-twitter"
      className="inline-flex items-center px-4 py-2 border rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
    >
      Share on X
    </a>
  );
}
