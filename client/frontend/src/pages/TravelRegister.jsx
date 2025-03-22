import "./TravelRegister.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../components/Button";
import Header from "../components/Header";

// 날짜를 "1박 2일" 형식으로 변환하는 함수
const formatDays = (travelStartDt, travelEndDt) => {
  if (!travelStartDt || !travelEndDt) return "기간 미정";

  // 문자열을 Date 객체로 변환 (예: "20250323" → "2025-03-23")
  const parseDate = (dateStr) => {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작
    const day = parseInt(dateStr.substring(6, 8), 10);
    return new Date(year, month, day);
  };

  const startDate = parseDate(travelStartDt);
  const endDate = parseDate(travelEndDt);

  // 일수 계산
  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  return `${diff}박 ${diff + 1}일`;
};

const TravelRegister = ({ addPost }) => {
  const navigate = useNavigate();
  const [region, setRegion] = useState(""); // 지역 상태
  const [title, setTitle] = useState(""); // 제목 상태
  // const [content, setContent] = useState(""); // 내용 상태
  const [costType, setCostType] = useState(""); // 비용 상태
  const [travelStartDt, setTravelStartDt] = useState(null); // 시작 날짜
  const [travelEndDt, settravelEndDt] = useState(null); // 종료 날짜
  const [category, setCategory] = useState(""); // 카테고리
  const [means, setMeans] = useState(""); // 이동수단
  const [season, setSeason] = useState(""); // 계절
  const [contents, setContents] = useState(""); // 내용

  const [showInfoForm, setShowInfoForm] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [infoSaved, setInfoSaved] = useState(false);
  const [isInfoProcessing, setIsInfoProcessing] = useState(false);

  const handleInfoSave = () => {
    setInfoSaved(true);
    setShowInfoForm(false);
    setIsInfoProcessing(false); // 정보 처리 후 '정보 처리하기' 버튼 숨기기
  };

  const handleInfoEdit = () => {
    setShowInfoForm(true); // 수정할 때 입력 폼을 다시 띄움
    setIsInfoProcessing(true); // 수정 시 '정보 처리하기' 버튼 표시
  };

  const handleInfoDelete = () => {
    setPlaceName("");
    setAddress("");
    setContact("");
    setInfoSaved(false);
    setShowInfoForm(false);
    setIsInfoProcessing(false); // '정보 처리하기' 버튼 숨기기
  };

  const handleReset = () => {
    setPlaceName("");
    setAddress("");
    setContact("");
    // `showInfoForm`을 그대로 두어 입력 폼은 계속 표시되도록 유지
  };

  const handleSave = () => {
    if (!title || !travelStartDt || !travelEndDt) {
      alert("제목, 내용 및 여행 날짜를 입력하세요!");
      return;
    }

    // 날짜를 "YYYYMMDD" 형식으로 변환하는 함수
    const formatDateToYYYYMMDD = (date) => {
      return date ? date.toISOString().split("T")[0].replace(/-/g, "") : "";
    };

    const newPost = {
      title,
      // contents: content,
      region, // 지역
      days: {
        travelStartDt: travelStartDt
          .toISOString()
          .split("T")[0]
          .replace(/-/g, ""),
        travelEndDt: travelEndDt.toISOString().split("T")[0].replace(/-/g, ""),
        formatted: formatDays(
          travelStartDt.toISOString().split("T")[0].replace(/-/g, ""),
          travelEndDt.toISOString().split("T")[0].replace(/-/g, "")
        ),
      },
      costType, // 비용
      category, // 카테고리
      means, // 이동수단
      placeInfo: infoSaved ? { placeName, address, contact } : null,
      season,
      contents,
    };

    addPost(newPost);
    navigate("/course");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="TravelRegister-post">
        <div className="title">
          <label>제목명</label>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="selectGroup1">
          <div className="selectRegion">
            <label>지역</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="" disabled>
                지역을 선택해주세요.
              </option>
              <option value="서울">서울</option>
              <option value="대구">대구</option>
              <option value="부산">부산</option>
            </select>
          </div>
          <div className="selectSeason">
            <label>계절</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              <option value="" disabled>
                계절을 선택해주세요.
              </option>
              <option value="SPRING">봄</option>
              <option value="SUMMER">여름</option>
              <option value="AUTUMN">가을</option>
              <option value="WINTER">겨울</option>
            </select>
          </div>
        </div>
        <div>
          <label>내용</label>
          <textarea></textarea>
        </div>

        <div className="selectCategory">
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              카테고리를 선택해주세요.
            </option>
            <option value="가족여행">가족여행</option>
            <option value="드라이브">드라이브</option>
            <option value="캠핑">캠핑</option>
            <option value="트래킹">트래킹</option>
            <option value="맛집투어">맛집투어</option>
            <option value="레저여행">레저여행</option>
            <option value="데이트">데이트</option>
            <option value="자전거여행">자전거여행</option>
          </select>
        </div>

        <div className="date-picker">
          <label>여행 시작일</label>
          <DatePicker
            selected={travelStartDt}
            onChange={(date) => setTravelStartDt(date)}
            selectsStart
            travelStartDtDate={travelStartDt}
            travelEndDtDate={travelEndDt}
            dateFormat="yyyy-MM-dd"
            ClassName="wide-datepicker"
          />
          <label>여행 종료일</label>
          <DatePicker
            selected={travelEndDt}
            onChange={(date) => settravelEndDt(date)}
            selectsEnd
            travelStartDt={travelStartDt}
            travelEndDtDate={travelEndDt}
            minDate={travelStartDt}
            dateFormat="yyyy-MM-dd"
            ClassName="wide-datepicker"
          />
        </div>

        <div className="selectGroup2">
          <div className="selectCostType">
            <label>경비</label>
            <select
              value={costType}
              onChange={(e) => setCostType(e.target.value)}
            >
              <option value="" disabled>
                비용을 선택해주세요.
              </option>
              <option value="UNDER_100K">10만원 이하</option>
              <option value="BETWEEN_100K_200K">10만원 ~ 20만원</option>
              <option value="BETWEEN_200K_300K">20만원 ~ 30만원</option>
              <option value="BETWEEN_300K_400K">30만원 ~ 40만원</option>
              <option value="BETWEEN_400K_500K">40만원 ~ 50만원</option>
              <option value="OVER_500K">50만원 이상</option>
            </select>
          </div>
          <div className="selectMeans">
            <label>이동수단</label>
            <select value={means} onChange={(e) => setMeans(e.target.value)}>
              <option value="" disabled>
                비용을 선택해주세요.
              </option>
              <option value="traffic">대중교통</option>
              <option value="car">자동차</option>
              <option value="tax">택시</option>
              <option value="walk">도보</option>
              <option value="cycle">자전거</option>
            </select>
          </div>
        </div>

        {!infoSaved && (
          <div className="courseAdd">
            <span>코스 01</span>
            <button
              className="courseAddBtn"
              onClick={() => setShowInfoForm(true)}
            >
              정보 추가하기
            </button>
          </div>
        )}
        {showInfoForm && (
          <div className="handleButton">
            <Button
              onClick={handleReset}
              text={"초기화"}
              type="handle-secondary"
            ></Button>
            <Button
              onClick={handleInfoSave}
              text={"입력완료"}
              type="handle"
            ></Button>
          </div>
        )}
        {showInfoForm && (
          <div className="info-form">
            <div className="info-form place">
              <label>장소명</label>
              <input
                type="text"
                placeholder="장소명"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
            <div className="info-form address">
              <label>주소</label>
              <input
                type="text"
                placeholder="주소"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="info-form information">
              <label>영업시간</label>
              <input
                type="text"
                placeholder="ex. 09시 ~ 20시"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <label>연락처</label>
              <input
                type="text"
                placeholder="연락처"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        )}

        {infoSaved && (
          <div className="courseEdit">
            <span>코스 01</span>
            <Button
              onClick={handleInfoDelete}
              text={"삭제"}
              type="secondary"
            ></Button>
            <Button onClick={handleInfoEdit} text={"수정"} type="edit"></Button>
          </div>
        )}

        <div className="TravelRegister_btn">
          <Button onClick={handleCancel} text={"취소"} type="secondary" />
          <Button onClick={handleSave} text={"저장"} type="primary" />
        </div>
      </div>
    </>
  );
};

export default TravelRegister;
