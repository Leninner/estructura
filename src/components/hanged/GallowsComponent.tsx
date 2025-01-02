import { GallowsComposite } from "./GallowsComposite";
import { RopeComponent } from "./RopeComponent";
import { HeadComponent } from "./HeadComponent";
import { BodyComponent } from "./BodyComponent";
import { LimbComponent } from "./LimbComponent";

const BASE_STROKE_WIDTH = 5;
const BASE_STROKE_COLOR = "white";

interface GallowsComponentProps {
	errors: number;
}

export const GallowsComponent = ({ errors }: GallowsComponentProps) => {
	const composite = new GallowsComposite();
	composite.add(new RopeComponent());
	composite.add(new HeadComponent());
	composite.add(new BodyComponent());
	composite.add(new LimbComponent("leftArm"));
	composite.add(new LimbComponent("rightArm"));
	composite.add(new LimbComponent("leftLeg"));
	composite.add(new LimbComponent("rightLeg"));

	const componentsToDraw = composite.render().props.children.slice(0, errors);

	return (
		<svg height="300" width="200" className="gallows">
			{/* Poste vertical */}
			<line x1="50" y1="50" x2="50" y2="250" stroke={BASE_STROKE_COLOR} strokeWidth={BASE_STROKE_WIDTH} />

			{/* Barra superior */}
			<line x1="50" y1="50" x2="150" y2="50" stroke={BASE_STROKE_COLOR} strokeWidth={BASE_STROKE_WIDTH} />

			{/* Soporte base */}
			<line x1="30" y1="250" x2="70" y2="250" stroke={BASE_STROKE_COLOR} strokeWidth={BASE_STROKE_WIDTH} />

			{/* Soporte diagonal */}
			<line x1="50" y1="100" x2="100" y2="50" stroke={BASE_STROKE_COLOR} strokeWidth={BASE_STROKE_WIDTH} />

			{/* Componentes a dibujar */}
			{componentsToDraw}
		</svg>
	);
};
