import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({ doctor, index, refetch, setDeletingDoctor }) => {
    const { name, specialty, img, email } = doctor;

    // const handleDelete = () =>{
    //     fetch(`http://localhost:5000/doctor/${email}`,{
    //         method:'DELETE',
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //     .then(res=> res.json())
    //     .then(data =>{
    //         console.log(data);
    //         if(data.deletedCount){
    //             toast.success(`Doctor: ${name} is deleted`)
    //             refetch()
    //         }
    //     })
    // }
    return (
        <tr>
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-8 rounded">
                    <img src={img} alt={name} />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{specialty}</td>
            <td>
            <label onClick={() => setDeletingDoctor(doctor)} for="delete-confirm-modal" class="btn btn-xs btn-error">Delete</label>

                {/* <button onClick={() => handleDelete(email)} for="delete-confirm-modal" class="btn btn-xs btn-error">Delete</button> */}
            </td>
        </tr>
    );
};

export default DoctorRow;