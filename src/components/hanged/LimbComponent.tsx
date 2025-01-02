import { GallowsPart } from "./GallowsPart"

type LimbClassesTypes = "leftArm" | "rightArm" | "leftLeg" | "rightLeg"

export class LimbComponent implements GallowsPart {
	LimbClasses = {
		leftArm: () => <line x1="150" y1="150" x2="130" y2="170" stroke="white" strokeWidth="3" />,
		rightArm: () => <line x1="150" y1="150" x2="170" y2="170" stroke="white" strokeWidth="3" />,
		leftLeg: () => <line x1="150" y1="190" x2="130" y2="220" stroke="white" strokeWidth="3" />,
		rightLeg: () => <line x1="150" y1="190" x2="170" y2="220" stroke="white" strokeWidth="3" />,
	}

	limb: LimbClassesTypes

	constructor(limb: LimbClassesTypes) {
		this.limb = limb
	}

	render(): JSX.Element {
		const Limb = this.LimbClasses[this.limb]

		return <Limb />
	}
}