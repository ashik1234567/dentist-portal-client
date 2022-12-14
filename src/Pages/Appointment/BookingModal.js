import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({date,treatment,setTreatment,refetch}) => {
    const {_id,name,slots} = treatment;
    const [user] = useAuthState(auth);
    const formattedDate = format(date,'PP')

    const handleBooking = e =>{
        e.preventDefault();
        const slot = e.target.slot.value;

        const booking ={
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient:user.email,
            patientName:user.displayName,
            phone:e.target.phone.value
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
               console.log(data) ;
               if(data.success){
                toast(`Appointment is set, ${formattedDate} at ${slot}`)
            }
            else{
                toast.error(`Already have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)
            }
                refetch();
                setTreatment(null);
            });
    
    }
    return (
        <div>
                <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Booking for : {name}</h3>

                    <form onSubmit={handleBooking} action="" className='grid   grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" disabled defaultValue={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name = 'slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot , index) =>
                                <option 
                                defaultValue={slot}
                                key={index} 
                                >
                                    {slot}
                                </option> )
                            }
                        </select>
                        <input type="text" name= "name" disabled defaultValue={user?.displayName} className="input input-bordered w-full max-w-xs" />
                        <input  type="text" name = "email" disabled defaultValue={user?.email} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" defaultValue='Submit' className="btn btn-secondary w-full max-w-xs text-white" />
                    </form>
                   
                </div>
            </div>
        </div>
    );
};

export default BookingModal;