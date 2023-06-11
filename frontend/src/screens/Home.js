import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useState, useEffect } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setfFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }

    })
    response = await response.json()

    setFoodItem(response[0])
    setfFoodCat([
      {
        "_id": "647df327655cf1a9479ac01c",
        "CategoryName": "Biryani/Rice"
      },
      {
        "id": "647df347655cf1a9479ac01d",
        "CategoryName": "Starter"
      },
      {
        "id": "647df368655cf1a9479ac01e",
        "CategoryName": "Pizza"
      },
    ])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div  >
      <div><Navbar /></div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>

        <div className='carousel-inner' id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
               { setSearch(e.target.value)}
              }}/>
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
            </div>

          </div>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className='row'>
                  <div key={data._id} className='fs-3 m-3 text-white'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? foodItem.filter((item) =>
                    (item.CategoryName === data.CategoryName)  && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 md-6 col-lg-3'>
                          <Card className="fs-1" foodItem={filterItems}
                            options={filterItems.options[0]} 
                            desc={filterItems.description}
                          />
                        </div>
                      )
                    }
                    ) : <div>  "No such data" </div>}
                </div>


              )
            })
            : "...."
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
