import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { View, StyleSheet, Dimensions } from 'react-native'

const Placeholder = createShimmerPlaceholder(LinearGradient)

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.43

const ProductShimmer = () => {
	return (
		<View style={styles.card}>
			{/* Image placeholder */}
			<Placeholder style={styles.image} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />

			{/* Content container */}
			<View style={styles.content}>
				{/* Title placeholder */}
				<Placeholder style={styles.title} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />

				{/* Rating container placeholder */}
				<View style={styles.ratingContainer}>
					<Placeholder style={styles.rating} shimmerColors={['#ebebeb', '#ddd', '#ebebeb']} />
				</View>
			</View>
		</View>
	)
}

export const ProductShimmerGrid = () => {
	return (
		<View style={styles.container}>
			{[...Array(6)].map((_, index) => (
				<ProductShimmer key={index} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		justifyContent: 'center',
	},
	card: {
		width: CARD_WIDTH,
		backgroundColor: 'white',
		borderRadius: 12,
		margin: 8,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
	},
	image: {
		width: '100%',
		height: CARD_WIDTH,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	content: {
		padding: 12,
		gap: 8,
	},
	title: {
		height: 20,
		width: '85%',
		borderRadius: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rating: {
		height: 16,
		width: '30%',
		borderRadius: 4,
	},
})
