/* eslint-disable no-console */
import { useRecoilState } from "recoil"
import { Helmet } from "react-helmet"
import { ErrorBoundary } from ".."
import axios from "axios"
import { internalServerErrorCaughtState, fileDataState } from "../../state"
import { _renderAsyncContent, _resetBackend } from "../../utils"
import styles from "./Game.module.sass"

const { main, button } = styles
export default function Game() {
	const [internalServerErrorCaught, setInternalServerErrorCaught] = useRecoilState(internalServerErrorCaughtState)
	const [fileData, setFileData] = useRecoilState(fileDataState)
	const getFileData = async () => {
		const data = await axios.get("config.json").then(res => res.data)
		return data === {} ? _resetBackend(setInternalServerErrorCaught) : setFileData(data)
	}
	return _renderAsyncContent(
		internalServerErrorCaught,
		<ErrorBoundary level='page'>
			<Helmet>
				<title>Game</title>
				<meta name='description' content='The game' />
			</Helmet>
			<main className={main}>
				<button className={button} onClick={() => getFileData()}>
					Entrer
				</button>
				<button onClick={() => console.log(fileData)}>log</button>
			</main>
		</ErrorBoundary>
	)
}
