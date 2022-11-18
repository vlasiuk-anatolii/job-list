import JobList from './components/joblist/JobList'
import Detailed from './components/detailed/Detailed'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { NotFound } from './components/notfound/NotFound'

export default function App (): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/:jobId" element={<Detailed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
