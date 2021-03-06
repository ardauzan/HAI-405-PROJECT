import { ErrorBoundary } from ".."
import styles from "./Home.module.sass"
const { container, testul, button, h1class } = styles
export default function Home() {
	return (
		<ErrorBoundary level='page'>
			<main className={container}>
				<h1 className={h1class}> Les règles du jeu :</h1>
				<ul className={testul}>
					<li>Lun des joueurs est désigné ou tiré au sort pour être celui qui commence le jeu.</li>
					<li>
						Le meneur du jeu prend quelques instants pour choisir ce quil décide dincarner, il peut
						choisir un personnage, un objet ou un animal. Dès quil sait qui il incarne, il pose la
						question aux autres «qui suis-je ?». Pour éviter toute contestation et soupçon de
						tricherie, il peut écrire la réponse sur un papier avant de jouer.
					</li>
					<li>
						Le meneur du jeu ne peut donner aucun indice, il ne peut répondre que par «oui» ou par
						«non».
					</li>
					<li>
						Les autres joueurs doivent deviner qui il est en lui posant des questions auxquelles il
						ne peut répondre que par oui ou non.
					</li>
					<li>Le premier qui trouve la reponse à la question WHO AM I a gagné !!</li>
				</ul>
				<h3>Après ce petit rappel sur ce grand classique, cest à vous de jouer !</h3>

				<button className={button}>Commencer</button>
			</main>
		</ErrorBoundary>
	)
}
