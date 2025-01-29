import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Product } from '../utils/api'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { COLORS } from '../utils/colors'

interface ProductCartProps {
	product: Product
}

const ProductCard = ({ product }: ProductCartProps) => {
	const router = useRouter()

	return (
		<Pressable style={styles.productCard} onPress={() => router.push(`/product/${product.id}`)}>
			<Image source={{ uri: product.image }} style={{ width: '100%', height: 200 }} />
			<View style={styles.productInfo}>
				<Text style={styles.productTitle} numberOfLines={2}>
					{product.title}
				</Text>
				<Text style={styles.productPrice}>${product.price}</Text>
			</View>
		</Pressable>
	)
}

export default ProductCard

const styles = StyleSheet.create({
	productCard: {
		flex: 1,
		margin: 8,
		backgroundColor: '#fff',
		padding: 12,
		boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
		gap: 8,
	},
	image: {
		width: '100%',
		height: 150,
		borderRadius: 12,
	},
	productInfo: {
		gap: 4,
	},
	productTitle: {
		fontSize: 14,
		fontWeight: '500',
	},
	productPrice: {
		fontSize: 16,
		fontWeight: '600',
		color: COLORS.primary,
	},
})
