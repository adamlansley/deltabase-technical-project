import { Link } from '@tanstack/react-router';
import ThemeToggle from '@/components/page/theme-toggle.tsx';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 backdrop-blur-lg border-b">
      <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link to="/">Home</Link>
        </div>
        <div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
