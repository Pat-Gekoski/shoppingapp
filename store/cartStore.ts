import { Product } from '@/utils/api'
import { create } from 'zustand'
import { zustandStorage } from './mmkv'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface CartState {
	products: Array<Product & { quantity: number }>
	addProduct: (product: Product) => void
	reduceProduct: (product: Product) => void
	clearCart: () => void
	total: number
	count: number
}

const INITIAL_STATE: Omit<CartState, 'addProduct' | 'reduceProduct' | 'clearCart'> = {
	products: [] as Array<Product & { quantity: number }>,
	total: 0,
	count: 0,
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			...INITIAL_STATE,
			addProduct: (product) => {
				set((state) => {
					const hasProduct = state.products.find((p) => p.id === product.id)
					const newTotal = +state.total.toFixed(2) + +product.price.toFixed(2)
					const newCount = state.count + 1

					if (hasProduct) {
						return {
							products: state.products.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)),
							total: newTotal,
							count: newCount,
						}
					} else {
						return {
							products: [...state.products, { ...product, quantity: 1 }],
							total: newTotal,
							count: newCount,
						}
					}
				})
			},
			reduceProduct: (product) => {
				set((state) => {
					const newTotal = +state.total.toFixed(2) - +product.price.toFixed(2)
					const newCount = state.count - 1

					return {
						products: state.products
							.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p))
							.filter((p) => p.quantity > 0),
						total: newTotal,
						count: newCount,
					}
				})
			},
			clearCart: () => {
				set(INITIAL_STATE)
			},
		}),
		{
			name: 'cart',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
)
