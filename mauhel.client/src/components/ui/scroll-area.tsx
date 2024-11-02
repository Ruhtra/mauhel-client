import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";





const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    onScrollableChange?: (isScrollable: boolean) => void;
  }
>(({ className, children, onScrollableChange, ...props }, ref) => {
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [isAtBottom, setIsAtBottom] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        const isContentScrollable = contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setIsScrollable(isContentScrollable);
        if (onScrollableChange) {
          onScrollableChange(isContentScrollable);
        }
      }
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, [children, onScrollableChange]);
  

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] relative" ref={contentRef}>
        {children}  
      </ScrollAreaPrimitive.Viewport>
      {
        isScrollable &&  !isAtBottom && <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 flex justify-center items-center cursor-pointer z-10">
        <div className="bg-primary p-2 rounded-full">
            <ChevronDown className="h-6 w-6 text-primary-foreground" />
          </div>
      </div>

      }

      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
