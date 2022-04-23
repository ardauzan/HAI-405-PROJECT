import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import components, { ErrorBoundary } from "./components"
const { Header, fallbackPages, Store } = components
const { InternalServerError, Loading, PageNotFound } = fallbackPages
const Game = lazy(() => import("./components/pageComponents/Game"))
const Generator = lazy(() => import("./components/pageComponents/Generator"))
const Home = lazy(() => import("./components/pageComponents/Home"))
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
				</BrowserRouter>
			</Store>
		</ErrorBoundary>
	)
}
