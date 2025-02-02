import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.styles.scss'
import AppRouter from './AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="appWrapper">
      <AppRouter />
    </div>
  </StrictMode>,
)
