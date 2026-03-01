export default function Footer() {
  return (
    <footer className="py-12 bg-slate-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-white">
              Shaw Cole
            </p>
            <p className="text-sm text-slate-500">Data Engine Architect</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="mailto:shaw@arkdata.io" className="hover:text-white transition-colors">
              shaw@arkdata.io
            </a>
            <a
              href="https://linkedin.com/in/shawcole"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ShawCole"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Shaw Cole. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
