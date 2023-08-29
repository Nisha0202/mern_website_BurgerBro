import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:4000/api/myorderDatalist", {
         
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
        
            let response = await res.json()
            await setorderData(response)
            
            
                // eslint-disable-next-line
            if (Array.isArray(response)) {
             
                console.log('response is an array');
              
          } else {
              console.log('response is not an array');
             
          }
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

       

    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className='container-fluid 'style={{ paddingTop: '5rem'}}>
          <div className='row'>
            {orderData !== {} ? Object.values(orderData).map(data => {
              return (
                data.order_data ? data.order_data.slice(0).reverse().map((item) => {
                  return (
                    item.map((arrayData) => {
                      return (
                    
                        <div>
                          {arrayData.Orderdate ? 
                          
                            <div className='m-auto mt-3 text-success fw-bold'>
                              {data = arrayData.Orderdate}
                             
                            </div>
                            :
                            <div className='col-12 col-md-6 col-lg-3'>
                              <div className="card mt-2" style={{ width: "18rem", maxHeight: "360px" }}>
                                <div className="card-body p-3">
                                  <h5 className="card-title">{arrayData.name}</h5>
                                  <div className='container w-100 p-0' style={{ height: "45px" }}>
                                    <span className='m-1'>{arrayData.quantity}</span>
                                    <span className='m-1'>{arrayData.size}</span>
                                    <span className='m-1'>{data}</span>
                                    <div className=' ms-1 h-100 w-20 fs-5'>
                                    {arrayData.price}tk/-
                                    <div></div>
                               
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr/>
                            </div>
                          }
                        </div>
                      )
                    })
                  )
                }) : ""
              )
            }) : ""}
          </div>
        </div>
      </div>
    );
          }