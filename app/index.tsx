import { useQuery } from '@tanstack/react-query'
import { StyleSheet, Text, View } from 'react-native'
import { getCategories, getProducts } from './utils/api'
import { FlashList } from '@shopify/flash-list'
import { useCallback } from 'react'
import ProductCard from './components/ProductCard'

export default function Index() {
	const {
		data: products,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
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

	const renderProduct = useCallback(({ item }: any) => {
		return <ProductCard product={item} />
	}, [])

	return (
		<View style={styles.container}>
			<FlashList
				data={products}
				renderItem={renderProduct}
				estimatedItemSize={200}
				numColumns={2}
				contentContainerStyle={{ padding: 8 }}
				keyExtractor={(item) => item.id.toString()}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
