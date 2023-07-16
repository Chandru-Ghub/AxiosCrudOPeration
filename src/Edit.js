import userEvent from '@testing-library/user-event';
import React, { useState } from 'react'

const Edit = () => {
    const obj = [
        {id:1,
         namee:'john',
         age :24
        },
        {id:2,
         namee:'Alex',
         age :27
        },
    ]
    const [data,setData] = useState(obj);
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [edit,setEdit] = useState(0)
    const handleSubmit =(e)=>{
         e.preventDefault()
        if(edit){
           
            const editToddo = data.find((a)=>a.id== edit);
            console.log(editToddo)
            const update = data.map((a)=>a.id==editToddo.id
            ?({id: a.id,namee:name,age:age})
            :{id:a.id,namee:a.namee,age:a.age}
            );
            console.log(update)

           
            setData(update);
           return
        }
        else{
        const len = data.length+1
        e.preventDefault()
        const add = [...data,{id:len,namee:name,age:age}]
        setData(add);
        setName('')
        setAge('')
        }
    }

    const handleEdit=(id)=>{

        const edit = data.find((a)=>a.id==id);
        setName(edit.namee)
        setAge(edit.age)
        setEdit(id)
    };
  return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} />
            <button type='submit'>{edit?'Add Edit':'ADD'}</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>AGE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {data.map((a,i)=>

                <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.namee}</td>
                    <td>{a.age}</td>
                    <td>
                        <button onClick={()=>handleEdit(a.id)}>Edit</button>
                        <button>Delete</button>
                    </td>

                </tr>
                )
}
            </tbody>
        </table>
    </div>
    
  )
}

export default Edit