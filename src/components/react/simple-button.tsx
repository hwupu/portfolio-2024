import type { ReactNode } from "react";
export default function SimpleButton({ children }: { children: ReactNode }) {
  return <button>{children}</button>;
}
