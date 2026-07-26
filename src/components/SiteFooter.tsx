export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="text-sm font-medium text-orange-50">Built by Pablo De La Cruz.</p>
        <p className="mt-1 max-w-xl text-sm text-orange-100/60">
          Practical AI engineering, data systems, and developer education—with the work and tradeoffs left
          visible.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href="https://github.com/pablodcruz" rel="noopener noreferrer" target="_blank">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/pdelac01/" rel="noopener noreferrer" target="_blank">
          LinkedIn
        </a>
        <a href="https://www.youtube.com/@clanker-site" rel="noopener noreferrer" target="_blank">
          YouTube
        </a>
      </div>
    </footer>
  );
}
