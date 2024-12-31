import { GallowsPart } from "./GallowsPart";

export class RopeComponent implements GallowsPart {
	render(): JSX.Element {
		return <line x1="150" y1="50" x2="150" y2="100" stroke="black" strokeWidth={3} />
	}
}
