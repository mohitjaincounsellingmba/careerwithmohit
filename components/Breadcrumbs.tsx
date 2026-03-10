"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const label = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        return { label, href };
    });

    if (breadcrumbs.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                </li>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={breadcrumb.href} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-foreground" aria-current="page">
                                {breadcrumb.label}
                            </span>
                        ) : (
                            <Link href={breadcrumb.href} className="hover:text-primary transition-colors">
                                {breadcrumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
