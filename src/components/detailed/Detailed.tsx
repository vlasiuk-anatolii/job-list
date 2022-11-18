import { useSelector } from 'react-redux'
import { getAllJobsSelector } from '../../store/selectors'
import { useParams, useNavigate } from 'react-router-dom'
import './Detailed.css'
import { useEffect, useState } from 'react'
import { randomNumber } from '../joblist/JobList'
import { Loader } from '../loader/Loader'
import { NotFound } from '../notfound/NotFound'

function initMap (lat: number, lng: number): void {
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat, lng },
    zoom: 8
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map
  })
}

export default function Detailed (): JSX.Element {
  const navigate = useNavigate()
  const { jobId } = useParams<{ jobId: string }>()
  const jobs = useSelector(getAllJobsSelector)
  console.log(jobs)
  const [allVacancy, setAllVacancy] = useState(jobs)
  const currentJob = allVacancy.find(job => job.id === jobId)
  const arrDescription = currentJob?.description.split(':')
  let arrBenefits
  if (arrDescription != null) {
    arrBenefits = arrDescription[2].split('.')
    arrBenefits.pop()
  }

  useEffect(() => {
    if (currentJob != null) {
      initMap(currentJob?.location.lat, currentJob?.location.long)
    }
  }, [currentJob])

  useEffect(() => {
    const allJob = localStorage.getItem('job')
    if (allJob !== null) {
      setAllVacancy(JSON.parse(allJob))
    }
  }, [])

  return (
    <div className="box-detailed">
      <div className="title-detailed">
        Job Details
      </div>
      <div className="box-save flex mb-8">
        <img className="detailed-flag" src="/images/flag.svg" alt="flag" />
        <svg className="detailed-star mr-3" width="20" height="20" viewBox="-1 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" stroke="#38415D" strokeWidth="2" clipRule="evenodd" d="M6.69871 4.58966C7.42979 2.93116 8.82013 0.000488281 9.51634 0.000488281C10.5274 -0.000511719 12.7421 5.68649 12.7421 5.68649C12.7421 5.68649 14.7923 5.86549 16.4493 6.04849C17.3289 6.14549 18.8997 6.29349 18.998 6.77849C19.019 6.88349 18.8927 7.31249 18.663 7.61149C17.69 8.88149 15.1654 11.6025 15.1654 11.6025C15.1654 11.6025 15.3038 12.9025 15.4272 14.3245C15.5064 15.2445 15.7201 17.1085 15.6428 17.4415C15.5586 17.8085 15.4071 17.9085 15.2497 17.9665C14.8384 18.1165 13.8835 17.5335 12.7682 16.9995C11.2486 16.2705 9.54141 15.4915 9.54141 15.4915C9.54141 15.4915 8.41501 16.0805 7.07998 16.6555C5.65367 17.2695 4.20931 18.2815 3.60649 17.9255C3.23035 17.7025 3.50919 15.9645 3.65363 14.4175C3.78904 12.9585 3.90639 11.6255 3.90639 11.6255C3.90639 11.6255 3.06987 10.6435 2.09592 9.59349C1.04375 8.45849 -0.239128 7.23349 0.0387113 6.78349C0.248344 6.44349 1.20523 6.26149 2.81209 6.06249C4.51924 5.85049 6.22439 5.70049 6.22439 5.70049C6.22439 5.70049 6.41022 5.24412 6.69871 4.58966Z" fill="#fff" />
        </svg>
        <p className="save-text mr-9">Save to my list</p>

        <svg className="mr-2.5" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M13.04 14.9096L5.91 10.743C5.96 10.512 6 10.2811 6 10.0402C6 9.7992 5.96 9.56827 5.91 9.33735L12.96 5.21084C13.5 5.71285 14.21 6.0241 15 6.0241C16.66 6.0241 18 4.67871 18 3.01205C18 1.34538 16.66 0 15 0C13.34 0 12 1.34538 12 3.01205C12 3.25301 12.04 3.48394 12.09 3.71486L5.04 7.84137C4.5 7.33936 3.79 7.02811 3 7.02811C1.34 7.02811 0 8.37349 0 10.0402C0 11.7068 1.34 13.0522 3 13.0522C3.79 13.0522 4.5 12.741 5.04 12.239L12.16 16.4157C12.11 16.6265 12.08 16.8474 12.08 17.0683C12.08 18.6847 13.39 20 15 20C16.61 20 17.92 18.6847 17.92 17.0683C17.92 15.4518 16.61 14.1365 15 14.1365C14.24 14.1365 13.56 14.4378 13.04 14.9096Z" fill="#38415D" />
        </svg>
        <p className="share-text">Share</p>
      </div>

      <div className="devider"></div>
      {(currentJob == null) && <><Loader /><NotFound /></>}
      <button className="button button-top">APPLY NOW</button>

      <p className="name-job">{currentJob?.title}</p>

      <div className="box-salary">
        <p className="brutto-text">Brutto, per year</p>
        <p className="salary">{currentJob?.salary}</p>
      </div>
      <p className="when-posted-detailed">{(currentJob != null) && `Posted ${new Date(currentJob?.createdAt).getDay()} days ago`}</p>

      <p className="description-job">{currentJob?.description}</p>

      <p className="subtitle-responsopilities">Responsopilities:</p>

      <p className="text-responsopilities">{arrDescription?.[1]}</p>

      <p className="subtitle-benefits">Compensation & Benefits:</p>
      <p className="text-benefits">Our employees enjoy a wide range of benefits, including:</p>
      <ul className="list-benefits mb-5">
        {arrBenefits?.map(benefit => {
          return (
            <li key={benefit}>
              <img
                className="square-marker"
                src="images/square-list.svg"
                alt="marker"
              />
              {`${benefit}.`}
            </li>
          )
        })}
      </ul>

      <button className="button button-bottom">APPLY NOW</button>

      <div className="images-container">
        <div className="title-images mb-2">
          Attached images
        </div>
        <div className="devider mb-3"></div>

        <div className="images-box mb-14">
          {currentJob?.pictures.map((picture, i) => {
            const num = randomNumber()
            const arrParts = picture.split('/')
            const url = `${arrParts[0]}//${arrParts[2]}/id/${num}/${arrParts[4]}/${arrParts[3]}`
            return (
              <img key={i} className="rounded-lg m-1" src={url} alt="pictures" />// key={i} Was assumed, that array with pictures will not be to change
            )
          })}
        </div>
      </div>

      <div className="addinfo-container">
        <div className="title-addinfo mb-2">
          Additional info
        </div>
        <div className="devider mb-4"></div>

        <p className="subtitle-addinfo">Employment type</p>
        <div className="box-employment flex mb-6">
          {currentJob?.employment_type.map((type, i) => {
            return (
              <div key={i} className="button-emptype mr-3">{type}</div>// key={i} Was assumed, that array with types will not be to change
            )
          })}
        </div>

        <p className="subtitle-addinfo">Benefits</p>
        <div className="box-benefits flex mb-16">
          {currentJob?.benefits.map((benefit, i) => {
            return (
              <div key={i} className="button-benefits mr-3">{benefit}</div> // key={i} Was assumed, that array with benefits will not be to change
            )
          })}
        </div>
      </div>

      <div className="title-addinfo title-addinfo-contacts mb-2">
        Contacts
      </div>
      <div className="devider devider-last mb-5"></div>

      <div className="box-contacts">
        <p className="department-name mb-4 pt-8 ml-16">Department name.
          <br />{currentJob?.name}</p>
        <div className="flex ml-16">
          <img className="location-marker-sm mr-2" src="/images/location.svg" alt="marker location" />
          <p className="contacts-address mb-1.5">{currentJob?.address}</p>
        </div>
        <p className="contacts-tel ml-16">{currentJob?.phone}</p>
        <p className="contacts-email mb-6 ml-16">{currentJob?.email}</p>
        <div id="map" className="map">
        </div>
      </div>

      <div
        className="button button-return flex mr-3"
        onClick={() => {
          navigate('/')
        }}
      ><img className="arrow" src="images/arrow.svg" alt="arrow" />RETURN TO JOB BOARD</div>
    </div>
  )
}
