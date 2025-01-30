import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/utils/colors'
import CartItem from '@/components/CartItem'

const Page = () => {
	const { products, total, clearCart } = useCartStore()
	const { bottom } = useSafeAreaInsets()
	const router = useRouter()

	const handleCheckout = () => {
		if (products.length === 0) {
			Alert.alert('Cart is empty', 'Please add some products to cart')
			return
		}

		clearCart()
		Alert.alert('Checkout successful')
		router.dismiss()
	}

	return (
		<View style={styles.container}>
			{products.length === 0 && <Text style={styles.emptyText}>No products in cart</Text>}
			<FlatList
				data={products}
				contentContainerStyle={{ gap: 10 }}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <CartItem product={item} />}
				ListHeaderComponent={() => <>{products.length > 0 && <Text style={styles.totalText}>Total: ${total}</Text>}</>}
			/>
			<TouchableOpacity
				style={[styles.addToCartButton, { paddingBottom: Platform.OS === 'ios' ? bottom : 20 }]}
				onPress={handleCheckout}
			>
				<Ionicons name='checkmark' size={20} color='white' />
				<Text style={styles.addToCartText}>Checkout</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Page

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	emptyText: {
		textAlign: 'center',
		marginTop: 20,
	},
	totalText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10,
	},
	addToCartButton: {
		backgroundColor: COLORS.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		padding: 16,
	},
	addToCartText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	},
})
