import React, { useEffect, useState } from 'react'
import Stars from '../../components/stars/Stars'
import { Pagination } from '../../components/pagination/Pagination'
import { getAllInfo } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../../store/action'
import { getAllJobsSelector } from '../../store/selectors'
import './JobList.css'
import { useNavigate } from 'react-router-dom'
import { Job } from '../../react-app-env'
import { Loader } from '../loader/Loader'

export function randomNumber (): number {
  const number = Math.ceil(Math.random() * 200)
  return number
}

export default function JobList (): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentListPerPage, setCurrentListPerPage] = useState<Job[]>([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getAllInfo().then((result) => {
      console.log(result)
      dispatch(setAllJobs(result))
      localStorage.setItem('job', JSON.stringify(result))
    }).catch((error) => {
      alert(error)
    })
  }, [dispatch])

  const jobs = useSelector(getAllJobsSelector)

  useEffect(() => {
    setCurrentListPerPage(jobs.slice(0 + (currentPage - 1) * 5, 5 * currentPage))
  }, [currentPage, jobs])

  return (
    <div className="box">
      {currentListPerPage.length === 0 && <Loader />}
      <ul className="job-list">
        {currentListPerPage.map((item) => {
          const num = randomNumber()
          return (
          <li key={item.email} className="li shadow mb-2 flex bg-blue-50 rounded-lg">
            <img
              className="custom-img rounded-full"
              src={`https://picsum.photos/id/${num}/200/300`}
              alt="picturejob"
            />
            <div className="info">
              <div className="stars flex">
                <Stars />
              </div>
              <img className="flag-mark" src="/images/flag.svg" alt="flag" />
              <span className="when-posted">{`Posted ${new Date(item.createdAt).getDay()} days ago`}</span>
              <p
                className="title"
                onClick={() => {
                  navigate(`/${item.id}`)
                }}
              >{item.title}</p>
              <p className="department">{`Department name • ${item.name}`}</p>
              <div className="flex">
                <img className="location-mark" src="/images/location.svg" alt="location" />
                  <p className="location">{item.address}</p>
              </div>
            </div>
          </li>
          )
        })}
      </ul>
      <Pagination
        total={jobs.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
