import { ReactNode } from "react";

export const Background = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full relative bg-background overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 24% 30%, var(--primary) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, var(--accent) 0%, transparent 60%)
          `,
          opacity: 0.25,
        }}
      />

      <main className="relative z-10 my-32 p-5 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};
