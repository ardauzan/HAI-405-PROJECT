import { Suspense, lazy } from "react"
import Store from "./store"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import fallbacks from "./pages/fallbacks"
import { Header } from "./components"
import { ErrorBoundary, Footer } from "./components"

const Game = lazy(() => import("./pages/Game"))
const Generator = lazy(() => import("./pages/Generator"))
const Home = lazy(() => import("./pages/Home"))

const { InternalServerError, Loading, PageNotFound } = fallbacks

export default function App() {
	return (
		<ErrorBoundary type="root">
			<Store>
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
			</Store>
		</ErrorBoundary>
	)
}
