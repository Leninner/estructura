import { GallowsPart } from "./GallowsPart";

export class BodyComponent implements GallowsPart {
	render(): JSX.Element {
		return <line x1="150" y1="140" x2="150" y2="190" stroke="white" strokeWidth="3" />
	}
}