const LimbClasses = {
	leftArm: () => <line x1="150" y1="150" x2="130" y2="170" stroke="black" strokeWidth="3" />,
	rightArm: () => <line x1="150" y1="150" x2="170" y2="170" stroke="black" strokeWidth="3" />,
	leftLeg: () => <line x1="150" y1="190" x2="130" y2="220" stroke="black" strokeWidth="3" />,
	rightLeg: () => <line x1="150" y1="190" x2="170" y2="220" stroke="black" strokeWidth="3" />,
}

type LimbClassesTypes = keyof typeof LimbClasses

export const LimbComponent = ({ limb }: { limb: LimbClassesTypes }) => {
	const Limb = LimbClasses[limb]
	return <Limb />
}	
