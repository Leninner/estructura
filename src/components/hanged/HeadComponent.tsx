import { GallowsPart } from "./GallowsPart";

export class HeadComponent implements GallowsPart {
	render(): JSX.Element {
		return <circle cx="150" cy="120" r="20" stroke="black" strokeWidth="3" fill="none" />
	}
}