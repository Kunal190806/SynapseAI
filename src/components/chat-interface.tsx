import { Input } from "@/components/ui/input";
import { ChevronsRight } from "lucide-react";

export default function ChatInterface() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Input
        type="search"
        placeholder="Ask Synapse anything... (e.g., 'What's the status of Project Phoenix?')"
        className="h-10 w-full rounded-full bg-muted pl-10 pr-10"
      />
      <ChevronsRight className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">✨</span>
    </div>
  );
}
