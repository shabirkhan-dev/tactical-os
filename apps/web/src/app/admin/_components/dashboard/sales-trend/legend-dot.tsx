type Props = {
	color: string;
	label: string;
};

export function LegendDot({ color, label }: Props) {
	return (
		<span className="inline-flex items-center gap-1.5 font-medium text-[10.5px] text-dashboard-text-muted uppercase">
			<span aria-hidden className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
			{label}
		</span>
	);
}
