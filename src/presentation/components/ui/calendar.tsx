import {DayPicker, DayPickerProps} from "react-day-picker";

import {cn} from "@/presentation/lib/utils";
import {buttonVariants} from "@/presentation/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

type CalendarProps = DayPickerProps & {
    className?: string;
};

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row gap-2",
                month: "flex flex-col gap-4",
                caption: "flex justify-center pt-1 relative items-center w-full",
                caption_label: "text-sm font-medium",
                nav: "flex items-center gap-1",
                nav_button: cn(
                    buttonVariants({variant: "outline"}),
                    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-x-1",
                head_row: "flex",
                head_cell:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                day: cn(
                    buttonVariants({variant: "ghost"}),
                    "size-8 p-0 font-normal aria-selected:opacity-100 cursor-pointer"
                ),
                selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                today: "bg-accent text-accent-foreground",
                outside:
                    "text-muted-foreground aria-selected:text-muted-foreground",
                disabled: "text-muted-foreground opacity-50",
                range_start:
                    "aria-selected:bg-primary aria-selected:text-primary-foreground",
                range_end:
                    "aria-selected:bg-primary aria-selected:text-primary-foreground",
                range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                hidden: "invisible",
                ...classNames,
            }}
            components={{
                Chevron: ({className, ...props}) => {
                    if (props.orientation === "left") {
                        return <ChevronLeft className={cn("size-4", className)} {...props} />
                    } else {
                        return <ChevronRight className={cn("size-4", className)} {...props} />
                    }
                }
            }}
            {...props}
        />
    );
}

export {Calendar};
