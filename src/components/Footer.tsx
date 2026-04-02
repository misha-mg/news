export function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 px-8 flex flex-col items-center justify-center gap-4 mt-24">
      <div className="flex gap-12 mb-4">
        <a
          href="#"
          className="font-body text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          Twitter
        </a>
        <a
          href="#"
          className="font-body text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="font-body text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          RSS Feed
        </a>
      </div>
      <p className="font-body text-xs tracking-wide opacity-60 text-primary">
        &copy; {new Date().getFullYear()} Dev News Curator
      </p>
      <p className="font-headline italic text-sm text-primary opacity-40">
        Typeset in Newsreader &amp; Inter
      </p>
    </footer>
  );
}
