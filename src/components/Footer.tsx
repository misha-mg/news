export function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-8 md:py-12 px-4 md:px-8 flex flex-col items-center justify-center gap-3 md:gap-4 mt-12 md:mt-24">
      <div className="flex gap-6 md:gap-12 mb-2 md:mb-4">
        <a
          href="#"
          className="font-body text-[11px] md:text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          Twitter
        </a>
        <a
          href="#"
          className="font-body text-[11px] md:text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="font-body text-[11px] md:text-xs tracking-wide opacity-60 text-primary hover:opacity-100 hover:text-primary-container transition-all"
        >
          RSS Feed
        </a>
      </div>
      <p className="font-body text-[11px] md:text-xs tracking-wide opacity-60 text-primary">
        &copy; {new Date().getFullYear()} Dev News Curator
      </p>
      <p className="font-headline italic text-xs md:text-sm text-primary opacity-40">
        Typeset in Newsreader &amp; Inter
      </p>
    </footer>
  );
}
