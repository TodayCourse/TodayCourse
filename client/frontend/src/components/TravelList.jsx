import { useNavigate } from "react-router-dom";
import "./TravelList.css";
import { formatDays } from "../util/until";
import React, { useEffect, useState } from "react";
import New from "../pages/TravelRegister";

const TravelList = ({ courses }) => {
  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 목록조회
  const TravelList = async () => {
    try {
      const response = await fetch("/api/travel");
      if (!response.ok) {
        throw new Error("데이터를 가져오는 데 실패했습니다.");
      }
      const data = await response.json();
      console.log(data.TravelResponseDtoList);
      setTravelList(data.TravelResponseDtoList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    TravelList();
  }, []);

  // const [travelList, setTravelList] = useState([]); // 여행 정보 목록 상태 관리

  // useEffect(() => {
  //   const fetchTravelList = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/travel"); // 백엔드 URL
  //       if (!response.ok) {
  //         throw new Error("데이터를 불러오는 데 실패했습니다.");
  //       }
  //       const data = await response.json();
  //       console.log(data.TravelResponseDtoList);
  //       setTravelList(data.TravelResponseDtoList);
  //       setTravelList(data); // 불러온 데이터를 상태에 저장
  //     } catch (error) {
  //       console.error("오류 발생:", error);
  //     }
  //   };

  //   fetchTravelList(); // 데이터 불러오기
  // }, []);

  const navigate = useNavigate();

  // 내용 페이지로 이동
  const goToContents = (travelId) => {
    navigate(`/contents/${travelId}`);
  };

  // 지역을 텍스트로 변환하는 함수
  const getRegionText = (region) => {
    const regionMap = {
      서울: "서울",
      대구: "대구",
      부산: "부산",
    };

    return regionMap[region] || "알 수 없음"; // 해당 지역이 없으면 "알 수 없음" 반환
  };

  return (
    <div className="TravelList">
      <div className="TravelList-contents">
        <ul>
          {courses.map((course) => (
            <li key={course.travelId} className="TravelList-item">
              <div
                className="TravelList-contents-"
                onClick={() => goToContents(course.travelId)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  {getRegionText(course.region)}&nbsp;|&nbsp;
                  {course.days.travelStartDt} ~ {course.days.travelEndDt} (
                  {course.days.formatted})
                </p>
                <h3>{course.title}</h3>
                <p className="TravelList-description">{course.contents}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelList;
