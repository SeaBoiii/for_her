import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import FilmGrain from './components/FilmGrain'
import Landing from './pages/Landing'
import HomeMap from './pages/HomeMap'
import Cafe from './pages/Cafe'
import RainyWindow from './pages/RainyWindow'
import LetterBox from './pages/LetterBox'
import PlaylistBench from './pages/PlaylistBench'
import Arcade from './pages/Arcade'
import SecretScene from './pages/SecretScene'

export default function App() {
  const location = useLocation()

  return (
    <>
      <FilmGrain />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<HomeMap />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/rainy-window" element={<RainyWindow />} />
          <Route path="/letter-box" element={<LetterBox />} />
          <Route path="/playlist-bench" element={<PlaylistBench />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/secret-scene" element={<SecretScene />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
