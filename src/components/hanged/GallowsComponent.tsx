import { BodyComponent } from "./BodyComponent";
import { HeadComponent } from "./HeadComponent";
import { LimbComponent } from "./LimbComponent";
import { RopeComponent } from "./RopeComponent";

const BASE_STROKE_WIDTH = 5;

interface GallowsComponentProps {
	errors: number;
}

export const GallowsComponent = ({ errors }: GallowsComponentProps) => {
	const COMPONENTS_TO_DRAW = [
		<RopeComponent />,
		<HeadComponent />,
		<BodyComponent />,
		<LimbComponent limb="leftArm" />,
		<LimbComponent limb="rightArm" />,
		<LimbComponent limb="leftLeg" />,
		<LimbComponent limb="rightLeg" />,
	]

	const componentsToDraw = COMPONENTS_TO_DRAW.slice(0, errors);

	return (
		<svg height="300" width="200" className="gallows">
			{/* Poste vertical */}
			<line x1="50" y1="50" x2="50" y2="250" stroke="black" strokeWidth={BASE_STROKE_WIDTH} />

			{/* Barra superior */}
			<line x1="50" y1="50" x2="150" y2="50" stroke="black" strokeWidth={BASE_STROKE_WIDTH} />

			{/* Soporte base */}
			<line x1="30" y1="250" x2="70" y2="250" stroke="black" strokeWidth={BASE_STROKE_WIDTH} />

			{/* Soporte diagonal */}
			<line x1="50" y1="100" x2="100" y2="50" stroke="black" strokeWidth={BASE_STROKE_WIDTH} />

			{/*componentes a dibujar*/}
			{componentsToDraw}
		</svg>
	);
};
