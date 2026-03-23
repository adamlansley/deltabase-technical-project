import { LoaderCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils.ts';

const loadingSpinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'h-12 w-12',
      xs: 'h-4 w-4',
      sm: 'h-8 w-8',
      lg: 'h-16 w-16',
      xl: 'h-24 w-24',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type LoadingSpinnerProps = VariantProps<typeof loadingSpinnerVariants> & {
  className?: string;
};

export const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle
        className={cn(loadingSpinnerVariants({ size, className }))}
      />
    </div>
  );
};
