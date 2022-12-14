import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';


const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    
    const [token] = useToken(user || gUser);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        if(token){
            navigate(from, { replace: true});
        }
    },[token, from, navigate])

    if( loading || gLoading){
        return <Loading> </Loading>
    }
    if( error || gError){
        signInError = <p className='text-red-500'> {error?.message || gError?.error}</p>
    }
    if(gUser){
       navigate(from , {replace: true});
    }
    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email , data.password)

    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    
                    <h2 className=" text-center font-bold text-xl">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        className="input input-bordered w-full max-w-xs"
                        {...register("email",{
                            required:{
                                value:true,
                                message:'Your Email is required'
                            },
                            pattern:{
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message:'Provide a valid email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' &&  <span className="label-text-alt text-red-400">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern'  &&  <span className="label-text-alt text-red-400">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Your Password" 
                        className="input input-bordered w-full max-w-xs"
                        {...register("password",{
                            required:{
                                value:true,
                                message:'Password is required'
                            },
                            minLength:{
                            value:6,
                            message:'Must be 6 character or stronger'
                            }
                        })}
                    />
                    <label className="label">
                    {errors.password?.type === 'required' &&  <span className="label-text-alt text-red-400">{errors.password.message}</span>}
                    {errors.password?.type === 'minLength'  &&  <span className="label-text-alt text-red-400">{errors.password.message}</span>}
                    </label>
                </div>
                        {signInError}
                    <input className='btn w-full max-w-xs' type="Submit" defaultValue="Login" />

            </form>

            <p>New To Doctors Portal <Link to='/signup' className='text-primary' >Create New Account</Link></p>


                    <div className="divider">OR</div>
                    <button 
                    onClick={() => signInWithGoogle()}
                    className="btn btn-active"
                    
                    >Continue With Google</button>

                    </div>
                </div>
            </div>
      
    );
};

export default Login;