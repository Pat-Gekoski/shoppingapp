import { useQuery } from '@tanstack/react-query'
import { Text, View } from 'react-native'
import { getCategories, getProducts } from './utils/api'

export default function Index() {
	const { data: products } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	})

	console.log(products)

	const { data: categories = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
	})

	console.log(categories)

	const allCategories = ['all', ...categories]

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>Edit app/index.tsx to edit this screenasfasdf.</Text>
		</View>
	)
}
