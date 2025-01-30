import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Product } from '@/utils/api'
import { Image } from 'expo-image'
import { useCartStore } from '@/store/cartStore'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/utils/colors'

type CartItemProps = {
	product: Product & { quantity: number }
}

const CartItem = ({ product }: CartItemProps) => {
	const { addProduct, reduceProduct } = useCartStore()

	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		if (type === 'increment') {
			addProduct(product)
		} else {
			reduceProduct(product)
		}
	}

	return (
		<View style={styles.cartItemContainer}>
			<Image source={{ uri: product.image }} style={styles.image} />
			<View style={styles.itemContainer}>
				<Text style={styles.cartItemName}>{product.title}</Text>
				<Text style={styles.cartItemPrice}>${product.price}</Text>
			</View>
			<View style={styles.quantityContainer}>
				<TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('decrement')}>
					<Ionicons name='remove' size={24} color='black' />
				</TouchableOpacity>
				<Text style={styles.cartItemQuantity}>{product.quantity}</Text>
				<TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('increment')}>
					<Ionicons name='add' size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default CartItem

const styles = StyleSheet.create({
	cartItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		backgroundColor: 'white',
		marginBottom: 10,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 10,
	},
	itemContainer: {
		flex: 1,
	},
	cartItemName: {
		fontSize: 16,
		fontWeight: '600',
	},
	cartItemPrice: {},
	quantityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	quantityButton: {
		padding: 10,
	},
	cartItemQuantity: {
		fontWeight: 'bold',
		backgroundColor: COLORS.primary,
		fontSize: 16,
		padding: 5,
		width: 30,
		color: 'white',
		textAlign: 'center',
	},
})
