import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Header.css";

import Home from "./Home";
import TodayCourse from "./TodayCourse";
import Course from "./Course";
import RandomTrip from "./RandomTrip";
import ImpormationTrip from "./ImpormationTrip";
import Login from "./Login";

import logo from "./../assets/logo.png";
import { FiMenu } from "react-icons/fi";

function Header() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/Login");
  };
  return (
    <>
      <div className="menu">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="로고" />
          </Link>
        </div>
        <div className="nav">
          <Link to={"/todaycourse"}>오늘의코스</Link>
          <Link to={"/course"}>여행코스</Link>
          <Link to={"/randomtrip"}>랜덤여행</Link>
          <Link to={"/impormationtrip"}>여행정보</Link>
        </div>
        <div className="right-btn">
          <div className="login-btn">
            <button onClick={onClickButton}>로그인/회원가입</button>
          </div>
          <div className="menu-btn">
            <FiMenu size="23" />
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todaycourse" element={<TodayCourse />} />
        <Route path="/course" element={<Course />} />
        <Route path="/randomtrip" element={<RandomTrip />} />
        <Route path="/impormationtrip" element={<ImpormationTrip />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Header;
