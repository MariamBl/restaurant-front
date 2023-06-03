import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './cssB.css';

export default function Specialite() {
    const [specialites, setspecialite] = useState([]);

    const {id}=useParams()
    useEffect(() => {
        loadSpecialite();
        
    }, []); 

    const loadSpecialite=  async () => {
        const result = await axios.get("http://localhost:8080/specialites/api/specialites");
        setspecialite(result.data);
    };

    const deletSpecialite = async (id)=>{
      await axios.delete(`http://localhost:8080/specialites/delete/${id}`)
      loadSpecialite()
    }
  return (
    <div className='container-bg'>
        <div className='container'>
            <div className='py-4'>  <Link className='btn btn-success mx-2' to="/addSpecialite">Add specialite</Link>
    </div>
          
            <div className='py-4'>
       
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">nom</th>
      <th scope="col">Action</th>

     
      
    </tr>
  </thead>
  <tbody>  
    {
        specialites.map((specialite,index)=>(

            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{specialite.nom}</td>
             <td>
                <Link className='btn btn-primary mx-2' to={`/editspecialite/${specialite.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2' onClick={()=>deletSpecialite(specialite.id)}>Delete</button>
             </td>
         
            
          </tr>
        ))
    }
   
   
  </tbody>
</table>
        </div>
    </div>
    </div>
  )
}
