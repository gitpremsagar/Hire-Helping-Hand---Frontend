"use client";

import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const RefreshButton = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  return (
    <Button variant="outline" onClick={() => {
      setIsRefreshing(true);
      toast.loading("Refreshing...", { id: "refresh" });
      router.refresh();
      setIsRefreshing(false);
      toast.dismiss("refresh");
    }}>
      {isRefreshing ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="mr-2 h-4 w-4" />
      )}
      {isRefreshing ? "Refreshing..." : "Refresh"}
    </Button>
    
  );
};