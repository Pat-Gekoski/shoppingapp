import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Product } from '@/utils/api'
import { Image } from 'expo-image'
import { useCartStore } from '@/store/cartStore'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/utils/colors'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { Easing, SharedValue, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import Reanimated from 'react-native-reanimated'

type CartItemProps = {
	product: Product & { quantity: number }
}

const CartItem = ({ product }: CartItemProps) => {
	const { addProduct, reduceProduct } = useCartStore()
	const reanimatedRef = useRef<SwipeableMethods>(null)
	const opacityAnim = useSharedValue(1)
	const scaleAnim = useSharedValue(1)
	const heightAnim = useSharedValue(80)

	const handleQuantityChange = (type: 'increment' | 'decrement') => {
		if (type === 'increment') {
			addProduct(product)
		} else {
			reduceProduct(product)
		}

		scaleAnim.value = withSequence(withSpring(1.2, { damping: 2, stiffness: 80 }), withSpring(1, { damping: 2, stiffness: 80 }))
	}

	const LeftActions = (progress: SharedValue<number>, dragX: SharedValue<number>, onShouldDelete: () => void) => {
		const styleAnimation = useAnimatedStyle(() => {
			return {
				transform: [{ translateX: dragX.value - 100 }],
			}
		})

		return (
			<Reanimated.View style={styleAnimation}>
				<TouchableOpacity onPress={onShouldDelete} style={styles.leftAction}>
					<Ionicons name='trash' size={24} color='white' />
				</TouchableOpacity>
			</Reanimated.View>
		)
	}

	const onShouldDelete = async () => {
		opacityAnim.value = withTiming(0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		})
		heightAnim.value = withTiming(0, {
			duration: 300,
			easing: Easing.inOut(Easing.ease),
		})
		await new Promise((resolve) => setTimeout(resolve, 300))
		reanimatedRef.current?.close()
		for (let i = 0; i < product.quantity; i++) {
			reduceProduct(product)
		}
	}

	const quantityAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scaleAnim.value }],
		}
	})
	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacityAnim.value,
			height: heightAnim.value,
		}
	})

	return (
		<Reanimated.View style={animatedStyle}>
			<ReanimatedSwipeable
				ref={reanimatedRef}
				renderLeftActions={(progress, dragX) => LeftActions(progress, dragX, onShouldDelete)}
				leftThreshold={50}
				friction={2}
				containerStyle={styles.swipeable}
			>
				<View style={styles.cartItemContainer}>
					<Image source={{ uri: product.image }} style={styles.image} />
					<View style={styles.itemContainer}>
						<Text style={styles.cartItemName}>{product.title}</Text>
						<Text>${product.price}</Text>
					</View>
					<View style={styles.quantityContainer}>
						<TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('decrement')}>
							<Ionicons name='remove' size={24} color='black' />
						</TouchableOpacity>
						<Reanimated.Text style={[styles.cartItemQuantity, quantityAnimatedStyle]}>{product.quantity}</Reanimated.Text>
						<TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange('increment')}>
							<Ionicons name='add' size={24} color='black' />
						</TouchableOpacity>
					</View>
				</View>
			</ReanimatedSwipeable>
		</Reanimated.View>
	)
}

export default CartItem

const styles = StyleSheet.create({
	cartItemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		backgroundColor: '#fff',
		height: 80,
		padding: 5,
	},
	image: {
		width: 50,
		height: '100%',
		borderRadius: 10,
		resizeMode: 'contain',
	},
	itemContainer: {
		flex: 1,
	},
	cartItemName: {
		fontSize: 16,
		fontWeight: '600',
	},
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
	swipeable: {
		height: 80,
	},
	leftAction: {
		backgroundColor: 'red',
		width: 100,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
