import { ErrorBoundary } from ".."
import styles from "./Home.module.sass"
const { container, testul, button, h1class } = styles
export default function Home() {
	return (
		<ErrorBoundary level='page'>
			<main className={container}>
<<<<<<< HEAD
				<h1> WHO AM I - Les règles du jeu :</h1>
				<ul>
=======
				<h1 className={h1class}> Les règles du jeu :</h1>
				<link rel='preconnect' href='https://fonts.googleapis.com'></link>
				<link rel='preconnect' href='https://fonts.gstatic.com'></link>
				<link
					href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
					rel='stylesheet'></link>
				<ul className={testul}>
>>>>>>> 14030a0d35a054b4c90fa3977a2a66355bcd746b
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
