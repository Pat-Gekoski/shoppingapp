import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../utils/colors'
import { Link } from 'expo-router'

const CartButton = () => {
	const { count } = useCartStore()

	return (
		<Link href={'/cart'} asChild>
			<TouchableOpacity>
				{count > 0 && (
					<View style={styles.countContainer}>
						<Text style={styles.countText}>{count}</Text>
					</View>
				)}
				<Ionicons name='cart' size={28} color='black' />
			</TouchableOpacity>
		</Link>
	)
}

export default CartButton

const styles = StyleSheet.create({
	countContainer: {
		position: 'absolute',
		right: -10,
		bottom: -5,
		backgroundColor: COLORS.primary,
		borderRadius: 10,
		fontWeight: 'bold',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		width: 20,
		height: 20,
	},
	countText: {
		fontSize: 12,
		color: 'white',
	},
})
