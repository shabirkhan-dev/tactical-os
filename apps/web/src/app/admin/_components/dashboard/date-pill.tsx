"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CalendarPicker } from "./calendar/calendar-picker";

const MONTHS_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function formatDate(d: Date) {
	return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

type Props = {
	date?: Date;
	onChange?: (date: Date) => void;
	className?: string;
};

export function DatePill({ date: controlled, onChange, className }: Props) {
	const [internal, setInternal] = useState<Date>(controlled ?? new Date(2025, 10, 6));
	const value = controlled ?? internal;

	const handleChange = (d: Date) => {
		setInternal(d);
		onChange?.(d);
	};

	return (
		<PopoverPrimitive.Root>
			<PopoverPrimitive.Trigger
				render={(props) => (
					<button
						type="button"
						{...props}
						className={cn(
							"flex h-9 items-center gap-2 rounded-lg border border-dashboard-border-subtle bg-dashboard-surface px-3 text-[13px] text-dashboard-text-secondary transition-colors hover:border-dashboard-border-strong hover:bg-dashboard-surface-hover data-popup-open:border-dashboard-border-strong data-popup-open:bg-dashboard-surface-elevated",
							className,
						)}
					>
						<HugeiconsIcon
							icon={Calendar03Icon}
							size={15}
							strokeWidth={1.8}
							className="text-dashboard-text-muted"
						/>
						<span className="font-medium">{formatDate(value)}</span>
					</button>
				)}
			/>
			<PopoverPrimitive.Portal>
				<PopoverPrimitive.Positioner
					side="bottom"
					align="end"
					sideOffset={8}
					className="isolate z-50"
				>
					<PopoverPrimitive.Popup className="data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 origin-(--transform-origin) outline-none">
						<CalendarPicker
							value={value}
							onChange={handleChange}
							className="w-[min(420px,calc(100vw-24px))]"
						/>
					</PopoverPrimitive.Popup>
				</PopoverPrimitive.Positioner>
			</PopoverPrimitive.Portal>
		</PopoverPrimitive.Root>
	);
}
