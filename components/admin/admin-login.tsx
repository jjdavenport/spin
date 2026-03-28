"use client";

import { AuthDialog } from "@/components/auth/auth-dialog";

export function AdminLogin() {
  return (
    <div className="min-h-screen bg-background">
      <AuthDialog
        open={true}
        onOpenChange={() => {}}
        defaultMode="sign-in"
        redirectTo="/admin"
      />
    </div>
  );
}
