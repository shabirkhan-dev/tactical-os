import Image from "next/image";

type AgencyProps = {
	name: string;
	description: string;
	image: string;
	link: string;
};

export function Agency({ name, description, image, link }: AgencyProps) {
	return (
		<div className="">
			<h1>{name}</h1>
			<p>{description}</p>
			<Image src={image} alt={name} width={100} height={100} className="w-10 h-10" />
			<a href={link}>{link}</a>
		</div>
	);
}
