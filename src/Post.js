import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import Axios from 'axios'

let foo = '</>'
const Post = () => {
    const [data,setData] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [edit,setEdit] = useState(0);
    const [toggle,setToggle] = useState(false)
    let ide= data.length
    useEffect(()=>{
        Axios('https://jsonplaceholder.typicode.com/users').then(result=>setData(result.data));
    },[])
    const handleDelete=(id)=>{
        const filt = data.filter((a)=>a.id!==id)
       setData(filt)
    }
    const handleEdit=(id)=>{
        setToggle(true)
        let edit = data.find((a)=>a.id==id)
        console.log(edit)
        // setData(ilterName)
        setName(edit.name)
        setPhone(edit.phone)
        setEmail(edit.email)
        setEdit(id)
        
        
    }
   
    const handleSubmit=(e)=>{

        e.preventDefault()
        if(edit){
            let filterID2 = data.find((a)=>a.id==edit);
            console.log(filterID2.id)
            let update = data.map((a)=>a.id==filterID2.id?
            ({id:a.id,name,email,phone}):
            {id:a.id,name:a.name,phone:a.phone,email:a.email}
            )

            console.log(update)
            setData(update);
            setName('')
            setEmail('')
            setPhone('')
            setEdit(0)
            setToggle(false)
            return
           
        }
         
         else if(name!==''&&email!==''&&phone!==''){

            const idlen = data.length+1
            const add = [...data,{id:ide+1,name:name,phone:phone,email:email}]
            setData(add)
            setName('')
            setPhone('')
            setEmail('')
           ide++
        }
           
    
    }
  return (
    
    <div className="win">
      
    <div className='con'>
    <p className='title'>CRUD OPERATION</p>
        <div className="inputCard">
        <p className={toggle?'green':'blue'}>{toggle?'EDIT DATA':'ADD DATA'}</p>
        <form onSubmit={handleSubmit}>
            <input value={name} required
            onChange={(e)=>setName(e.target.value)}  type="text" 
            placeholder='Enter name' />


            <input 
            required
            value={email} 
            type="email" 
            placeholder='Enter email' 
            onChange={(e)=>setEmail(e.target.value)}/>


            <input 
            required
            value={phone} 
            type='tel'
            placeholder='Enter phone Number' 
            onChange={(e)=>setPhone(e.target.value)}/>


            <button className={toggle?'btn ab b':'btn ab a'} type='submit'>
            {toggle?'EDIT':'ADD'}</button>
        </form>
       
        </div>
    <div className="card-body">
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
               
                {
            data.map((a,i)=>
            <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>
                    <button onClick={()=>handleEdit(a.id)} className='btn btn1'><FaEdit/></button>
                    <button onClick={()=>handleDelete(a.id)} className='btn'><TiDelete/></button>
                </td>
            </tr>
            )
        }
              
            </tbody>
        </table>
        </div>
        
        <p className='footer'>&copy;chandru{foo} </p>
    </div>
    </div>
  )
}

export default Post