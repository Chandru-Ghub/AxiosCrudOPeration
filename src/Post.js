import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios'
let ide = 10
const Post = () => {
    const [data,setData] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [edit,setEdit] = useState(0);
    const [toggle,setToggle] = useState(false)
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
    <div>
        <p className="names">POST METHOD</p>
        <form onSubmit={handleSubmit}>
            <input value={name} 
            onChange={(e)=>setName(e.target.value)}  type="text" 
            placeholder='Enter name' />


            <input 
            value={email} 
            type="text" 
            placeholder='Enter email' 
            onChange={(e)=>setEmail(e.target.value)}/>


            <input 
            value={phone} 
            type="text" 
            placeholder='Enter phone Number' 
            onChange={(e)=>setPhone(e.target.value)}/>


            <button type='submit'>
            {toggle?'Add Edit':'ADD'}</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>EMAIL</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
               
                {
            data.map((a,i)=>
            <tr key={i}>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.phone}</td>
                <td>{a.email}</td>
                <td>
                    <button onClick={()=>handleEdit(a.id)}>Edit</button>
                    <button onClick={()=>handleDelete(a.id)}>Delete</button>
                </td>
            </tr>
            )
        }
              
            </tbody>
        </table>
       
        

    </div>
  )
}

export default Post