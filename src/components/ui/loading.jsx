import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ className, ...props }) {
  return (
    <Loader2
      className={`h-4 w-4 animate-spin ${className || ''}`}
      {...props}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <LoadingSpinner className="h-8 w-8 text-emerald-500" />
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
      <LoadingSpinner className="h-8 w-8 text-emerald-500" />
    </div>
  );
}