"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./login-form";

interface ILoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: ILoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    if (mode === "modal") {
      return (
        <Dialog>
          <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
          <DialogContent className="p-0 w-auto bg-transparent border-none">
            <LoginForm />
          </DialogContent>
        </Dialog>
      );
    }
    router.push("/auth/login");
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
