import { GallowsPart } from "./GallowsPart";

export class GallowsComposite implements GallowsPart {
	private children: GallowsPart[] = [];

	add(part: GallowsPart): void {
		this.children.push(part);
	}

	render(): JSX.Element {
		return <>{this.children.map((child) => child.render())}</>;
	}
}
