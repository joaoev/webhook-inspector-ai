const apiBaseUrl = import.meta.env.VITE_API_URL

if (!apiBaseUrl) {
	throw new Error('Missing VITE_API_URL in web/.env')
}

export const API_BASE_URL = apiBaseUrl
