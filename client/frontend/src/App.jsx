import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import Home from "./pages/Home";
import SiteInfo from "./pages/SiteInfo";
import Travel from "./pages/Travel";
import TravelList from "./components/TravelList";
import TravelRegister from "./pages/TravelRegister";
import TravelInfo from "./pages/TravelInfo";
import TravelUpdate from "./pages/TravelUpdate";
import RandomTrip from "./pages/RandomTrip";
import ImpormationTrip from "./pages/ImpormationTrip";
import Login from "./pages/Login";

import { useEffect } from "react";

const TravelStateContext = createContext();
const TravelDispatchContext = createContext();

// "YYYYMMDD" 형식의 문자열을 Date 객체로 변환
const parseDate = (dateString) => {
  if (!dateString) return null;
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // JS에서 월은 0부터 시작
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
};

// 날짜를 "1박 2일" 형식으로 변환
const formatDays = (startDt, endDt) => {
  if (!startDt || !endDt) return "기간 미정";

  const start = parseDate(startDt);
  const end = parseDate(endDt);
  if (!start || !end) return "기간 미정";

  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return `${diff}박 ${diff + 1}일`;
};

function App() {
  const [courses, setCourses] = useState([
    {
      travelId: 1,
      title: "가족들과 함께 떠나는 겨울여행",
      region: "대구",
      category: "가족여행",
      days: {
        travelStartDt: "20250320",
        travelEndDt: "20250321",
      },
      costType: "UNDER_100K",
      season: "WINTER",
      contents:
        "겨울 풍경 속에서 맛있는 음식과 다양한 체험을 즐기며 특별한 추억을 쌓을 수 있습니다. 차분하고 아름다운 겨울 분위기와 함께 힐링을 만끽할 수 있습니다 가족들과 함께 떠난 겨울여행이 따뜻한 기억으로만 가득 찼습니다 :)",
      regUserId: 1,
      mdfcUserId: 1,
    },
    {
      travelId: 2,
      title: "부산여행",
      region: "부산",
      category: "국내여행",
      days: {
        travelStartDt: "20250320",
        travelEndDt: "20250321",
      },
      costType: "UNDER_300K",
      season: "SUMMER",
      contents:
        "차분하고 아름다운 겨울 분위기와 함께 힐링을 만끽할 수 있습니다 가족들과 함께 떠난 겨울여행이 따뜻한 기억으로만 가득 찼습니다 :)",
      regUserId: 2,
      mdfcUserId: 2,
    },
  ]);

  useEffect(() => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        days: {
          ...course.days,
          formatted: formatDays(
            course.days.travelStartDt,
            course.days.travelEndDt
          ),
        },
      }))
    );
  }, []);

  const [nextId, setNextId] = useState(3);

  // 새 게시글 추가
  const addPost = (newPost) => {
    setCourses((prevCourses) => [
      ...prevCourses,
      { ...newPost, travelId: nextId },
    ]);
    setNextId((prevId) => prevId + 1); // ID 증가
  };

  // 게시글 수정
  const updatePost = (travelId, updatedPost) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.travelId === travelId ? { ...course, ...updatedPost } : course
      )
    );
  };

  // 게시글 삭제
  const deletePost = (travelId) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.travelId !== travelId)
    );
  };

  return (
    <TravelStateContext.Provider value={courses}>
      <TravelDispatchContext.Provider
        value={{ addPost, updatePost, deletePost }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siteinfo" element={<SiteInfo />} />
          <Route
            path="/travel"
            element={<Travel courses={courses} addPost={addPost} />}
          />
          <Route
            path="/travellist"
            element={<TravelList courses={courses} />}
          />
          <Route
            path="/travelregister"
            element={<TravelRegister addPost={addPost} />}
          />
          <Route
            path="/travelinfo/:travelId"
            element={<TravelInfo courses={courses} deletePost={deletePost} />}
          />
          <Route
            path="/travelupdate/:travelId"
            element={<TravelUpdate courses={courses} updatePost={updatePost} />}
          />
          <Route path="/randomtrip" element={<RandomTrip />} />
          <Route path="/impormationtrip" element={<ImpormationTrip />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </TravelDispatchContext.Provider>
    </TravelStateContext.Provider>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [hello, setHello] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/hello")
//       .then((response) => setHello(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   return <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
// }
// export default App;
