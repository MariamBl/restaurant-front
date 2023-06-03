import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './cssB.css';

export default function Serie() {
    const [series, setserie] = useState([]);

    const {id}=useParams()
    useEffect(() => {
        loadSerie();
        
    }, []); 

    const loadSerie =  async () => {
        const result = await axios.get("http://localhost:8080/series/api/series");
        setserie(result.data);
    };

    const deletSerie = async (id)=>{
      await axios.delete(`http://localhost:8080/series/delete/${id}`)
      loadSerie()
    }
  return (
    <div className='container-bg'>
    <div className='container'>
        <div className='py-4'>  <Link className='btn btn-success mx-2' to="/addSerie">Add serie</Link>
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
        series.map((serie,index)=>(

            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{serie.nom}</td>
             <td>
                <Link className='btn btn-primary mx-2' to={`/editserie/${serie.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2' onClick={()=>deletSerie(serie.id)}>Delete</button>
             </td>
         
            
          </tr>
        ))
    }
   
   
  </tbody>
</table>
        </div>
    </div></div>
  )
}
