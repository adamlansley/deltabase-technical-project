export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 px-4 pb-14 pt-10 text-(--sea-ink-soft) border-t">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">&copy; {year} Adam Lansley</p>
      </div>
    </footer>
  );
}
