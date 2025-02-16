import React, { useContext, useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { Flex ,Spinner} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm, Controller} from "react-hook-form"
import { data, Link, useNavigate } from 'react-router-dom';
import { showToast } from "./ToastComponent";
import Aos from "aos";
import axios from "axios";
import AppContext from "../context/AppContext";

export default function Login() {

  const {setLogin} = useContext(AppContext);

  const [load,setLoad] = useState(false);
    const {
        register: register,
        handleSubmit: handleSubmit,
        formState: { errors},
        control,
        reset
      } = useForm();

      const navigate = useNavigate();

      const submit = async(formData)=>{
        try{
          setLoad(true);
          let url = String(import.meta.env.VITE_URL);
          url += 'api/v1/login';

          const response = await axios.post(url,formData,{headers:{"Content-Type": "application/json"},});
          
          if(response.data.success){
            localStorage.setItem('token',response.data.token);
            showToast(response.data.message,"success");
            reset();
            setLogin(true);
            navigate('/home');
          }else{
            showToast(response.data.message,"error");
          }

          setLoad(false);
        }catch (err) {
          reset();      
          // Handle error response
          if (err.response) {
            // Server responded with a status code outside 2xx
            showToast(err.response.data.message || "Login failed", "error");
          } else {
            // Network or unknown error
            showToast("Something went wrong. Please try again.", "error");
          }
        } finally {
          setLoad(false);
        }
      }

  return (
    <div className="container-fluid background">
      <h1 className="text-center" style={{ color: "#dd6b20" }}>
        AnnaSetu
      </h1>
      <div className="mt-3 d-flex justify-content-center align-items-center p-1" data-aos='fade-up'>
        
          <form onSubmit={handleSubmit(submit)} className="p-3 border shadow-lg rounded" style={{backgroundColor:"white"}}>   

            <Field label="Email address"
              invalid={!!errors.password}
              errorText={errors.password?.message}            
            >
              <Input placeholder="Email" required type="email" 
              {...register("email", { required: "Email is Required" })}
              />
            </Field>
            <br />
            <Field label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}            
            >
              <PasswordInput placeholder="Password" required type="password" 
              {...register("password", { required: "Password is Required" })}
              />
            </Field>
            <br />
            
            <br/>
            <Flex
              justify="center" // Centers horizontally
              align="center" 
            >
              <Button
                variant={"solid"}
                color="white"
                backgroundColor="orange.400"
                size="lg"
                width="100%"
                rounded="2%"
                type='submit'
                disabled={load}
              >
               {load ? <Spinner size='sm'/> : 'Login'}
              </Button>
            </Flex>
            <br />
            <h6 className="text-center mb-2">Don't have an account? 
              <Link to='/signup' style={{color:'orange',textDecoration:'none'}}> &nbsp;Sign up</Link>
            </h6>
            </form>
      </div>
    </div>
  )
}
