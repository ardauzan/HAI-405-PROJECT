/* eslint-disable no-console */
import { useRecoilCallback } from "recoil"
export default function DebugButton() {
	return (
		<button
			onClick={useRecoilCallback(
				({ snapshot }) =>
					async () => {
						console.debug("Atom values:")
						for (const node of snapshot.getNodes_UNSTABLE()) {
							const value = await snapshot.getPromise(node)
							console.debug(node.key, value)
						}
					},
				[]
			)}>
			Dump State
		</button>
	)
}
