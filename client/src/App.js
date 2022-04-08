import { Suspense, lazy } from "react"
import { RecoilRoot } from "recoil"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import fallbacks from "./pages/fallbacks"
import { Header } from "./components"
import { ErrorBoundary, Footer } from "./components"

const Game = lazy(() => import("./pages/Game"))
const Generator = lazy(() => import("./pages/Generator"))
const Home = lazy(() => import("./pages"))

const { InternalServerError, Loading, PageNotFound } = fallbacks

export default function App() {
	return (
		<ErrorBoundary>
			<RecoilRoot>
				<BrowserRouter>
					<Header />
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/500" element={<InternalServerError />} />
							<Route path="/404" element={<PageNotFound />} />
							<Route path="/game" element={<Game />} />
							<Route path="/generator" element={<Generator />} />
							<Route path="/" element={<Home />} />
							<Route path="/*" element={<Navigate to="/404" />} />
						</Routes>
					</Suspense>
					<Footer />
				</BrowserRouter>
			</RecoilRoot>
		</ErrorBoundary>
	)
}
