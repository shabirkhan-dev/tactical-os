import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

function HugeIcon({ size = 18, children, ...props }: IconProps & { children: React.ReactNode }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
				{children}
			</g>
		</svg>
	);
}

export function AceMarkIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M12 3v18" />
			<path d="M3 12h18" />
			<path d="m5.6 5.6 12.8 12.8" />
			<path d="M18.4 5.6 5.6 18.4" />
			<path d="M12 3 9.8 8.8 4 12l5.8 3.2L12 21l2.2-5.8L20 12l-5.8-3.2L12 3Z" />
		</HugeIcon>
	);
}

export function SparkleIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M12 3 10.4 8.4 5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Z" />
			<path d="M5 16.5 4.2 19 2 19.8 4.2 20.6 5 23l.8-2.4L8 19.8 5.8 19 5 16.5Z" />
			<path d="M19 1l-.7 2.2L16 4l2.3.8L19 7l.7-2.2L22 4l-2.3-.8L19 1Z" />
		</HugeIcon>
	);
}

export function ChatIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M7.5 18.5 4 20l.9-3.7A8 8 0 1 1 7.5 18.5Z" />
			<path d="M8 11h.01" />
			<path d="M12 11h.01" />
			<path d="M16 11h.01" />
		</HugeIcon>
	);
}

export function CodeIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<rect x="4" y="5" width="16" height="14" rx="3" />
			<path d="m10 10-2 2 2 2" />
			<path d="m14 10 2 2-2 2" />
		</HugeIcon>
	);
}

export function LeafIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M5 19c9.5-.2 13-5.4 14-14-8.6 1-13.8 4.5-14 14Z" />
			<path d="M5 19c2.2-4.6 5.1-7.5 10-10" />
		</HugeIcon>
	);
}

export function SearchIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<circle cx="11" cy="11" r="6.5" />
			<path d="m16 16 4 4" />
		</HugeIcon>
	);
}

export function BellIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M18 9.8a6 6 0 1 0-12 0c0 6-2 6.7-2 6.7h16s-2-.7-2-6.7Z" />
			<path d="M10 20h4" />
		</HugeIcon>
	);
}

export function MessageIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M5 6.5h14v9H9l-4 3v-12Z" />
			<path d="M9 10h6" />
			<path d="M9 13h3.5" />
		</HugeIcon>
	);
}

export function UserAddIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<circle cx="9" cy="8" r="3" />
			<path d="M3.5 19c.8-3.2 2.7-5 5.5-5s4.7 1.8 5.5 5" />
			<path d="M18 8v6" />
			<path d="M15 11h6" />
		</HugeIcon>
	);
}

export function FolderIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M3.5 7.5h6l1.5 2h9.5v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.5Z" />
		</HugeIcon>
	);
}

export function PlusIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M12 5v14" />
			<path d="M5 12h14" />
		</HugeIcon>
	);
}

export function CheckIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="m6 12.4 3.5 3.6L18 7.5" />
		</HugeIcon>
	);
}

export function SunIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2.5v2.2" />
			<path d="M12 19.3v2.2" />
			<path d="M4.2 4.2l1.6 1.6" />
			<path d="M18.2 18.2l1.6 1.6" />
			<path d="M2.5 12h2.2" />
			<path d="M19.3 12h2.2" />
			<path d="M4.2 19.8l1.6-1.6" />
			<path d="M18.2 5.8l1.6-1.6" />
		</HugeIcon>
	);
}

export function MoonIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M20 13.2A8.5 8.5 0 0 1 10.8 4 8.5 8.5 0 1 0 20 13.2Z" />
		</HugeIcon>
	);
}

export function HomeIcon(props: IconProps) {
	return (
		<HugeIcon {...props}>
			<path d="M4.5 10.5 12 4.5l7.5 6" />
			<path d="M6.5 9.5V18a1 1 0 0 0 1 1H10v-4h4v4h2.5a1 1 0 0 0 1-1V9.5" />
		</HugeIcon>
	);
}

export function ArtifactsIcon({ size = 16, ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="4" y="4" width="7" height="7" rx="1.25" />
				<circle cx="17" cy="7.5" r="2.25" />
				<path d="M4 18.5 10.5 12" />
				<path d="M15.5 15.5h4M17.5 13.5v4" />
			</g>
		</svg>
	);
}

export function AppsIcon({ size = 16, ...props }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
				<rect x="7.5" y="7.5" width="9" height="9" rx="2" />
				<path d="M4.5 8V5.5A1 1 0 0 1 5.5 4.5H8" />
				<path d="M16 4.5h2.5A1 1 0 0 1 19.5 5.5V8" />
				<path d="M19.5 16v2.5A1 1 0 0 1 18.5 19.5H16" />
				<path d="M8 19.5H5.5A1 1 0 0 1 4.5 18.5V16" />
			</g>
		</svg>
	);
}
