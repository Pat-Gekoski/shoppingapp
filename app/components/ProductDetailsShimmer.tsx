import { View, StyleSheet } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export function ProductDetailsShimmer() {
	return (
		<View style={styles.container}>
			<ShimmerPlaceholder style={styles.image} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
			<View style={styles.content}>
				<ShimmerPlaceholder style={styles.title} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
				<ShimmerPlaceholder style={styles.price} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
				<ShimmerPlaceholder style={styles.category} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
				<ShimmerPlaceholder style={styles.description} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
				<ShimmerPlaceholder style={styles.rating} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	image: {
		width: '100%',
		height: 400,
		backgroundColor: '#f9f9f9',
	},
	content: {
		padding: 16,
		gap: 12,
	},
	title: {
		height: 28,
		width: '70%',
		borderRadius: 4,
	},
	price: {
		height: 24,
		width: '20%',
		borderRadius: 4,
	},
	category: {
		height: 20,
		width: '40%',
		borderRadius: 4,
	},
	description: {
		height: 80,
		width: '100%',
		borderRadius: 4,
	},
	rating: {
		height: 20,
		width: '30%',
		borderRadius: 4,
	},
})
