import { Card } from "@/components/ui/card";

export function CategoryGridCardSkeleton() {
    return (
        <Card className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-none ring-0">
            <div className="flex items-start justify-between gap-3">
                <div className="size-11 shrink-0 animate-pulse rounded-lg bg-gray-200" />
                <div className="flex shrink-0 gap-1">
                    <div className="size-8 animate-pulse rounded-md bg-gray-200" />
                    <div className="size-8 animate-pulse rounded-md bg-gray-200" />
                </div>
            </div>
            <div className="mt-4 min-h-0 flex-1 space-y-2">
                <div className="h-5 max-w-[70%] animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 max-w-[85%] animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
                <div className="h-7 w-28 max-w-[min(100%,11rem)] animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-14 shrink-0 animate-pulse rounded bg-gray-200" />
            </div>
        </Card>
    );
}
