import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Restaurant() {
    const [restaurants, setrestaurant] = useState([]);

    useEffect(() => {
        loadRestaurant();  
    }, []); 

    const loadRestaurant =  async () => {
        const result = await axios.get("http://localhost:8080/restaurants/api/restaurants");
        setrestaurant(result.data);
    };

    const deletRestaurant = async (id)=>{
      await axios.delete(`http://localhost:8080/restaurants/delete/${id}`)
      loadRestaurant()
    }
  return (
  
    <div className='container'>
        <div className='py-4'>  
            {/* <Link className='btn btn-outline-primary mx-2' to="/addRestaurant">Add Restaurant</Link> */}
        </div>
        <div className='row'>
        {
            restaurants.map(restaurant => (
                <div className='col-4'>
                    <div className="card my-2">
                        <div className="card-body">
                            <h5 className="card-title">{restaurant.nom}</h5>
                            <p className="card-text">Address: {restaurant.adresse}</p>
                            <p className="card-text">Rank: {restaurant.rank}</p>
                            <p className="card-text">Open on Weekends: {restaurant.weekend ? 'Yes' : 'No'}</p>
                            {/* <Link className='btn btn-primary mx-2' to={`/editrestaurant/${restaurant.id}`}>Edit</Link> */}
                            {/* <button className='btn btn-danger mx-2' onClick={()=>deletRestaurant(restaurant.id)}>Delete</button> */}
                            <Link to={`/restaurantDetail/${restaurant.id}`} className="btn btn-primary">
                    View 
                  </Link>
                        </div>
                    </div>
                </div>  
            ))
        }
        </div>
    </div>
  )
}