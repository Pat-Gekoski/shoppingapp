import { useReactQueryDevTools } from '@dev-plugins/react-query/build/useReactQueryDevTools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, useNavigationContainerRef, useRouter } from 'expo-router'
import CartButton from '../components/CartButton'
import { useMMKVDevTools } from '@dev-plugins/react-native-mmkv/build/useMMKVDevTools'
import { storage } from '@/store/mmkv'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Sentry from '@sentry/react-native'
import { useEffect } from 'react'

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: true,
})

Sentry.init({
	dsn: 'https://4dc4c1a4453cddd475a90c9155c770a1@o4508734581178368.ingest.us.sentry.io/4508734584520704',
	enableAutoSessionTracking: true,
	attachScreenshot: true,
	debug: false,
	tracesSampleRate: 1.0, // Adjust in production to smaller value
	_experiments: {
		profilesSampleRate: 1.0, // Adjust in production to smaller value
		replaysSessionSampleRate: 1.0, // Adjust in production to smaller value
		replaysOnErrorSampleRate: 1,
	},
	integrations: [
		Sentry.mobileReplayIntegration({
			maskAllText: false,
			maskAllImages: true,
			maskAllVectors: false,
		}),
		Sentry.spotlightIntegration(),
		navigationIntegration,
	],
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60,
		},
	},
})

const RootLayout = () => {
	useReactQueryDevTools(queryClient)
	useMMKVDevTools({ storage })
	const router = useRouter()

	const ref = useNavigationContainerRef()

	useEffect(() => {
		navigationIntegration.registerNavigationContainer(ref)
	}, [ref])

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<Stack>
					<Stack.Screen
						name='index'
						options={{
							title: 'Galactic Products',
							headerShadowVisible: false,
							headerSearchBarOptions: {
								placeholder: 'Search products...',
								hideWhenScrolling: false,
								hideNavigationBar: false,
							},
							headerRight: () => <CartButton />,
						}}
					/>
					<Stack.Screen
						name='product/[id]'
						options={{
							title: '',
							headerBackTitle: 'Products',
						}}
					/>
					<Stack.Screen
						name='cart'
						options={{
							title: 'Cart',
							presentation: 'modal',
							headerLeft: () => (
								<TouchableOpacity onPress={() => router.dismiss()}>
									<Ionicons name='close' size={24} color='black' />
								</TouchableOpacity>
							),
						}}
					/>
				</Stack>
			</GestureHandlerRootView>
		</QueryClientProvider>
	)
}

export default Sentry.wrap(RootLayout)
