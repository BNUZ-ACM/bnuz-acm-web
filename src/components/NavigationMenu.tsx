import React, { useState } from 'react';
import { SITE } from '@/config';
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/ModeToggle";
import { NAVMENU } from '@/config';




export function Navigation() {
    return (
        <NavigationMenu className='w-full'>
            <NavigationMenuList className=''>
                {
                    NAVMENU
                        .sort(
                            (a, b) =>
                                parseInt(a.id) - parseInt(b.id),
                        )
                        .map((item) => {
                            const prefetchProps = item.prefetch ? { 'data-astro-prefetch': 'viewport' } : {};

                            return (
                                <NavigationMenuItem key={item.id}>
                                    <div className="text-base subpixel-antialiased font-medium text-[#2c3e50]">
                                        <a href={item.url} className={`px-2 py-2 hover:text-ring`} {...prefetchProps}>
                                            {item.name}
                                        </a>
                                    </div>
                                </NavigationMenuItem>
                            );
                        })
                }

                {/* {
                    SITE.lightAndDarkMode ? (<NavigationMenuItem><ModeToggle /></NavigationMenuItem>) : ""
                } */}

            </NavigationMenuList>
        </NavigationMenu >
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"