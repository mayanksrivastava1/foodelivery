import React, { useRef } from 'react'
import{useDispatchCart, useCart } from './ContextReducer'
import { useState, useEffect } from 'react';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart()
    let option = props.options;
    const priceref = useRef();
    let priceOptions = Object.keys(option)
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("")
    const handleAddtoCart= async ()=>{

        let food = []
        for (const item of data) {
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }      
        }
        if(food !== []){
            if(food.size === size){
                await dispatch({type: "UPDATE" , id: props.foodItem._id, price: finalPrice, qty: qty})
                return;
            }
        }
        else if(food.size === size){
        await dispatch({type:'ADD', id:props.foodItem._id, name: props.foodItem.name, price: finalPrice , qty: qty, size:size})
        // console.log(data)
        return;
        }

        await dispatch({type:'ADD', id:props.foodItem._id, name: props.foodItem.name, price: finalPrice , qty: qty, size:size})
    }
    useEffect(() => {
        setsize(priceref.current.value)
      }, [])
    let finalPrice = qty * parseInt(option[size]);
   
    
    return (
            <div className="card mt-3" style={{ "width": "18rem", "height":"25rem" }}>
                <img src={props.foodItem.img}  className="card-img-top" alt="..." style={{height:"180px", objectFi:"fill" } }/>
                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:"20px"}}>{props.foodItem.name}</h5>
                    <h5 style={{fontSize:"10px"}}>{props.desc}</h5>
                    <div className="container w-100">
                        <select className='m-2 h-200 bg-success rounded text-white' style={{ backgroundColor: '#01BB8E' }} onChange={(e)=> setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-200  bg-success rounded text-white' ref={priceref} style={{ backgroundColor: '#01BB8E' }} onChange={(e)=> setsize(e.target.value)}>
                            {
                                priceOptions.map((data)=>{
                                    return <option key={data}  value={data}> {data} </option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                        ₹{finalPrice}/- 
                        </div>
                    </div>
                        <hr></hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddtoCart}>Add to Cart</button>
                </div>
            </div> 
    )
}
