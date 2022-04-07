import InternalServerError from "./InternalServerError"
import Loading from "./Loading"
import PageNotFound from "./PageNotFound"

const fallbacks = {
	InternalServerError,
	Loading,
	PageNotFound
}

export default fallbacks
