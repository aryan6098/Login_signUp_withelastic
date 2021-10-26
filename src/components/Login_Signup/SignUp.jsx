import { React, useState } from "react";
import login1 from "../../images/login1.png";
import "../../css/Login_Signup/sign.css";
import "../../css/Login_Signup/login.css";
import Details from "./Details";
import { Link } from "react-router-dom";
import eye from "../../images/eye.png";
import { useHistory } from "react-router";
import Db from "../DataBase";
import { indexName, docType } from "../../config";
export default function SignUp() {
  const [eyeImg, setEyeImg] = useState(false);
  const [eyeImg1, setEyeImg1] = useState(false);

  const history = useHistory();

  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  const inputText = (e) => {
    const { name, value } = e.target;

    setValue((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  //State for Validation Purpose
  const [userErr, setUserErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [phoneErr, setPhoneErr] = useState();
  const [passErr, setPassErr] = useState();
  const [cPassErr, setCPassErr] = useState();

  let name_Ch = /^([a-zA-Z\s]){2,15}$/;
  let email_ch = /^([_\-.0-9a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  let phone_ch = /([+\-0-9]){10,14}$/;

  function valid() {
    let convDataToArray = Object.values(value);
    let [name, email, phone, password, cpassword] = [
      convDataToArray[0],
      convDataToArray[1],
      convDataToArray[2],
      convDataToArray[3],
      convDataToArray[4],
    ];

    if (
      !name_Ch.exec(name) &&
      !email_ch.exec(email) &&
      !phone_ch.exec(phone) &&
      password.length < 7 &&
      cpassword.length < 7
    ) {
      setUserErr("Name is Required");
      setEmailErr("Password is required");
      setPhoneErr("Wrong Number");
      setPassErr("password length should be more than 7");
      setCPassErr("password length should be more than 7");
    } else if (!name_Ch.exec(name)) {
      setUserErr("User Name must be 3-15");
    } else if (!email_ch.exec(email)) {
      setEmailErr("Invalid Email Address");
    } else if (!phone_ch.exec(phone)) {
      setPhoneErr("Wrong Number");
    } else if (password.length < 7) {
      setPassErr("password length should be more than 7");
    } else if (cpassword.length < 7) {
      setCPassErr("password length should be more than 7");
    } else if (password !== cpassword) {
      setCPassErr("password And Confirm Password must be same");
    } else {
      return true;
    }
  }

  function submitForm(e) {
    e.preventDefault();
    if (valid()) {
      Db.index({
        index: indexName,
        type: docType,
        refresh: true,
        body: {
          name: value.name,
          email: value.email,
          password: value.password,
          confirm_password: value.cpassword,
        },
      })
        .then((response) => {
          console.log("Registered successfull", response);
        })
        .then((data) => {})
        .catch((error) => console.error(error));

      history.push("/");
    }
  }

  return (
    <>
      <section className="login">
        <div className="img"></div>
        <div className="earth-block"></div>
        <div className="center">
          <div className="leftSide">
            <div className="sign">
              <img src={login1} alt="loginImage" />
              <form onSubmit={submitForm}>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter User Name"
                  onChange={inputText}
                  value={value.name}
                  autoComplete="off"
                  required
                  onFocus={() => {
                    setUserErr(true);
                  }}
                />
                {userErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {userErr}
                    </span>
                  </>
                ) : null}

                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={inputText}
                  name="email"
                  value={value.email}
                  autoComplete="off"
                  required
                  onFocus={() => {
                    setEmailErr(true);
                  }}
                />
                {emailErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {emailErr}
                    </span>
                  </>
                ) : null}

                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  onChange={inputText}
                  name="phone"
                  value={value.phone}
                  autoComplete="off"
                  required
                  onFocus={() => {
                    setPhoneErr(true);
                  }}
                />
                {phoneErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {phoneErr}
                    </span>
                  </>
                ) : null}

                <input
                  type={eyeImg ? "text" : "password"}
                  placeholder="Password"
                  onChange={inputText}
                  name="password"
                  value={value.password}
                  autoComplete="off"
                  required
                  onFocus={() => {
                    setPassErr(true);
                  }}
                />

                <img
                  src={eye}
                  alt="eyeImage"
                  onClick={() => setEyeImg(!eyeImg)}
                  style={{
                    width: "3.5rem",
                    marginTop: "-3.2rem",
                    marginLeft: "31rem",
                    cursor: "pointer",
                  }}
                />
                {passErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {passErr}
                    </span>
                  </>
                ) : null}

                <input
                  type={eyeImg1 ? "text" : "password"}
                  placeholder="Password"
                  onChange={inputText}
                  name="cpassword"
                  value={value.cpassword}
                  autoComplete="off"
                  required
                  onFocus={() => {
                    setCPassErr(true);
                  }}
                />
                <img
                  src={eye}
                  alt="eyeImage"
                  onClick={() => setEyeImg1(!eyeImg1)}
                  style={{
                    width: "3.5rem",
                    marginTop: "-3.2rem",
                    marginLeft: "31rem",
                    cursor: "pointer",
                  }}
                />
                {cPassErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {cPassErr}
                    </span>
                  </>
                ) : null}

                <button className="signbtn" type="submit">
                  {" "}
                  Register{" "}
                </button>
              </form>
            </div>
          </div>
          {/* <div> */}

          <div className="rightSide">
            <Details />
            <div className="alreadySign">
              <p>Already Signed Up?</p>

              <Link className="signinLink" to="/">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
