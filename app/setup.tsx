import { useRoleInitial } from "@/hooks/role";

export default function Setup({ children }: { children: React.ReactNode }) {
  useRoleInitial();

  return children;
}
