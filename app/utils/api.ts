const API_URL = process.env.EXPO_PUBLIC_API_URL

export interface Product {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: Rating
}

export interface Rating {
	rate: number
	count: number
}

export const getProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${API_URL}/products`)
	return await response.json()
}

export const getProduct = async (id: number): Promise<Product> => {
	const response = await fetch(`${API_URL}/products/${id}`)
	return await response.json()
}

export const getCategories = async (): Promise<string[]> => {
	const response = await fetch(`${API_URL}/products/categories`)
	return await response.json()
}

const api = {
	getProducts,
	getProduct,
	getCategories,
}

export default api
