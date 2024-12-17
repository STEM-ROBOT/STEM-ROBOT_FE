import React, { useEffect, useState } from "react";
import Footer from "../../../system-ui/component/Footer/Footer";
import Header from "../../../system-ui/component/Header/Header";
import ComponentCreate from "../../component/ComponentCreate/ComponentCreate";
import SignIn from "../../../system-ui/component/Author/SignIn/SignIn";
import SignUp from "../../../system-ui/component/Author/SignUp/SignUp";
import TokenService from "../../../../config/tokenservice";
const CreateTournament = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const fetchedUserId = TokenService.getUserId();
  useEffect(()=>{
    if(!fetchedUserId){
      setSignIn(true);
    }
  },[fetchedUserId])

  return (
    <>
      {signIn === true && <SignIn setSignIn={setSignIn} setSignUp={setSignUp}/>}
      {signUp === true && <SignUp setSignUp={setSignUp} />}
      <ComponentCreate />
    </>
  );
};

export default CreateTournament;
