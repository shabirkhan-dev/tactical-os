type RecentSectionProps = {
	items: string[];
};

export function RecentSection({ items }: RecentSectionProps) {
	return (
		<div className="sidebar__section">
			<p className="sidebar__label">Recents</p>
			{items.map((recent) => (
				<button className="recent-item" type="button" key={recent}>
					{recent}
				</button>
			))}
		</div>
	);
}
