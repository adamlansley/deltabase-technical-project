import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/form/button/button.tsx';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Link to="/report/$id" params={{ id: '1' }}>
        <Button size="lg">Go to Report 1</Button>
      </Link>
    </main>
  );
}
