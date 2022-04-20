import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import components, { ErrorBoundary } from "./components"
// info destructre imports
const { baseComponents, fallbackPages, Store } = components
const { Footer, Header } = baseComponents
const { InternalServerError, Loading, PageNotFound } = fallbackPages
// info lazy load pages for ideal time to first byte
const Game = lazy(() => import("./components/pageComponents/Game"))
const Generator = lazy(() => import("./components/pageComponents/Generator"))
const Home = lazy(() => import("./components/pageComponents/Home"))
// info define App
export default function App() {
	return (
		<ErrorBoundary level='root'>
			<Store>
				<BrowserRouter>
					<Header />
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path='/500' element={<InternalServerError />} />
							<Route path='/404' element={<PageNotFound />} />
							<Route path='/game' element={<Game />} />
							<Route path='/generator' element={<Generator />} />
							<Route path='/' element={<Home />} />
							<Route path='/*' element={<Navigate to='/404' />} />
						</Routes>
					</Suspense>
					<Footer />
				</BrowserRouter>
			</Store>
		</ErrorBoundary>
	)
}
