import React, { useEffect, useState } from "react";
import { Input, Center } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Button } from "../components/ui/button";
import { Flex, Spinner } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "./ToastComponent";
import Aos from "aos";
import OTPInput from "react-otp-input";
import 'react-phone-input-2/lib/style.css'
import emailjs from '@emailjs/browser';
import apiRequest from "../context/ApiRequest";
import axios from "axios";


export default function Signup() {
  const navigate = useNavigate();
  const [otp,setOTP] = useState('');
  const [otpVer,setOtpVer] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
    reset
  } = useForm();
  let email;

  const generateOTP = () =>{
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const [sentOtp,setSentOtp] = useState('');
  const [load,setLoad] = useState(false);
  const [off,setOff] = useState(false);

  const templateParams = {
    to_email : email,
    otp : sentOtp,
    from_name : 'Annadata'
  }

  const sendEmail = () => {
    const sentOTP = generateOTP();
    setSentOtp(sentOTP);

    templateParams.otp = sentOTP;

    emailjs.send(import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_PUBLIE_KEY
    ).then((result)=>{
      setShow(true);
      showToast('OTP sent successfully ! Please check your email','success');
    },(error)=>{
      console.error(error);
      showToast('Failed to send error. Please try again','error');
    }
  )
  }


  const send = async(formData) => {
    setLoad(true);
    if(otpVer == true){
      let url = String(import.meta.env.VITE_URL);
      url += 'api/v1/signup';
      try{
        const response = await axios.post(url,formData,{headers:{"Content-Type": "application/json"},});
  
        if(response.data.success){
          showToast(response.data.message,'success');
          reset();
          setOTP('');
        }else
          showToast(response.data.message,'error');
      }catch(err){
        showToast('User already exists!',"error");
      }
    }else{
      showToast('Please verify OTP first...','warning');
    }
    setLoad(false);
  }


  const [load1, setLoad1] = useState(false);
  const [show,setShow] = useState(false);

  
  const handleOTP = ()=>{
    setLoad1(true);
    name = getValues('name');
    email = getValues('email');
    if(!email && !name){
      setError('email', {
        type: 'manual',
        message: 'Email is required.',
      });
      setError('name',{
        type:'manual',
        message:'Name is required.'
      })
    }else if(!email){
      setError('email', {
        type: 'manual',
        message: 'Email is required.',
      });
    }else if(!name){
      setError('name',{
        type:'manual',
        message:'Name is required.'
      })
    }
    else{
      clearErrors('email');
      clearErrors('name');
      templateParams.to_email = email;
      sendEmail();
      setOff(true);
    }
    setLoad1(false);
  }

  const verfiyOTP =()=>{

    if(otp === templateParams.otp){
      showToast('OTP verified','success');
      setOtpVer(true);
    }else{
      showToast('Invalid OTP','error');
      setOtpVer(false);
    }
  }
 

  return (
    <div className="container-fluid background">
      <h1 className="text-center" style={{ color: "#dd6b20" }}>
        AnnaData
      </h1>
      <div className="mt-3 d-flex justify-content-center align-items-center p-2" data-aos='fade-up'>
        <div
          className="container border shadow-lg rounded bg-light"
          style={{
            maxWidth: "350px"
          }}
        >
          <h1 className="text-center">Sign Up</h1>
          <form onSubmit={handleSubmit(send)}>
            <br />
            <Field
              label="Name"
              invalid={!!errors.name}
              errorText={errors.name?.message}
            >
              <Input
                placeholder="Name"
                required
                type="text"
                disabled={off}
                minLength={4}
                {...register("name", { required: "Name is required" })}
              />
            </Field>
            <br />
            <Field
              label="Email address"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                placeholder="Email"
                required
                disabled={off}
                type="email"
                {...register("email", { required: "Email is required" })}
              />
            </Field>
            <br />
           
            <Center>
                <Button  onClick={handleOTP}
                  disabled={otpVer}>
                  {load1 ? <Spinner size="sm"/> : 'Send OTP'}
                </Button>
            </Center>

              <div id="sign-in-button"></div>
            {
                show &&
                <>
                <Field
                  label="OTP"
                  invalid={!!errors.otp}
                  errorText={errors.otp?.message}
                >
                  <HStack width={'90%'}>
                  <OTPInput 
                    renderSeparator={<span>-</span>}
                    inputStyle={{backgroundColor:'lightgray',width:'30%',borderRadius:'5%',gap:5,display:'flex',justifyContent:'space-between',color:'black'}}
                    value={otp}
                    renderInput={(props) => <input {...props} />}
                    onChange={(e)=>{
                      setOTP(e);
                    }}
                  />
                  <Button colorPalette ={'green'} variant={'surface'} rounded={5} onClick={verfiyOTP} disabled={otpVer}>
                    Verify
                  </Button>
                  </HStack>
                </Field>
                <br/>
                <Field
                  label="Create Password"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <PasswordInput
                    placeholder="Password"
                    minLength={4}
                    maxLength={8}
                    {...register("password", { required: "Password is Required" })}
                  />
                </Field>
                <br />
                <Flex
                  justify="center" // Centers horizontally
                  align="center" // Centers vertically
                >
                  <Button
                    variant={"solid"}
                    color="white"
                    backgroundColor="orange.400"
                    size="lg"
                    width="100%"
                    rounded="2%"
                    type="submit"
                    disabled={load}
                  >
                    {load ? <Spinner size="sm" /> : "Login"}
                  </Button>
                </Flex>
                </>
            }
            <br />
            <h6 className="text-center mb-3 effect">
              Already have an account?
              <Link
                to="/login"
                style={{ color: "orange", textDecoration: "none" }}
              >
                &nbsp;Login
              </Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
}
