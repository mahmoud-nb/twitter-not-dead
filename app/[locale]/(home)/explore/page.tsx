import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";


export default function Explore() {
  return (
    <div>
      <div className="p-4">
        <div className="flex items-center gap-3 px-4 rounded-full bg-slate-50">
          <Search />
          <Input className="border-0 active:outline-none rounded-full" />
        </div>
      </div>
    </div>
  )
}
