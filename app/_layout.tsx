import { useReactQueryDevTools } from '@dev-plugins/react-query/build/useReactQueryDevTools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60,
		},
	},
})

export default function RootLayout() {
	useReactQueryDevTools(queryClient)

	return (
		<QueryClientProvider client={queryClient}>
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
					}}
				/>
			</Stack>
		</QueryClientProvider>
	)
}
