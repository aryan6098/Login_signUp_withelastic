import { React, useState, useEffect } from "react";
import "../../css/Login_Signup/sign.css";
import "../../css/Login_Signup/login.css";
import Details from "./Details";
import login1 from "../../images/login1.png";
import { Link, Redirect } from "react-router-dom";
import eye from "../../images/eye.png";
import Db from "../DataBase";
import { indexName, docType } from "../../config";
export default function SignIn() {
  const [userErr, setUserErr] = useState();
  const [eyeImg, setEyeImg] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resData, upateResdata] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  const token = localStorage.getItem("user-info");
  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }
  useEffect(() => {
    Db.search({
      index: indexName,
      type: docType,
    }).then(
      function (resp) {
        console.log(resp.hits.hits, resp);
        upateResdata(resp.hits.hits);
      },
      function (err) {
        console.log(err.message);
      }
    );
  }, []);
  useEffect(() => {
    if (resData.length > 0) {
      fetchData();
    }
  });
  const fetchData = () => {
    resData.map((val) => {
      setUser(val);
    });
  };
  function login() {
    console.log("user", resData);
    var flag = false;
    if (resData.length !== 0) {
      resData.map((val) => {
        if (val._source.email == email) {
          if (val._source.password === password) {
            updateIsLoggedIn(true);
            flag = true;
            let data = (val._source.email, val._source.password);
            console.log("login successfully");
            localStorage.setItem("user-info", JSON.stringify(data));
          }
        }
      });
      if (flag === false) {
        setUserErr("your email address or password is not correct");
      }
    } else {
      alert("Data Not Found");
    }
    console.log("res Data", resData);
  }
  function formHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      {loggedIn ? <Redirect to="/home" /> : <Redirect to="/" />}
      {isLoggedIn ? <Redirect to="/home" /> : null}

      <section className="login">
        <div className="img"></div>
        <div className="earth-block"></div>
        <div className="center">
          <div className="leftSide">
            <Details />
            <div className="alreadySign">
              <p> Don't have an account?</p>
              <Link className="signupLink" to="/signup">
                {" "}
                Sign Up
              </Link>
            </div>
          </div>

          <div className="rightSide">
            <div className="sign">
              <img src={login1} alt="loginImage" />
              <h2>Sign In</h2>
              <form onSubmit={formHandler}>
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onFocus={() => {
                    setUserErr(true);
                  }}
                />
                <input
                  type={eyeImg ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onFocus={() => {
                    setUserErr(true);
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
                {userErr ? (
                  <>
                    <span style={{ color: "red", fontSize: "1.5rem" }}>
                      {userErr}
                    </span>
                  </>
                ) : null}
                <button className="signbtn" type="submit" onClick={login}>
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
