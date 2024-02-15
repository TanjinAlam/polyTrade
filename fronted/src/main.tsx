import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import AllRoutes from '@/routes'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<div className='flex justify-center'>Loading...</div>}>
			<AuthProvider>
				<AllRoutes />
			</AuthProvider>
		</Suspense>
		<Toaster richColors />
	</React.StrictMode>,
)
