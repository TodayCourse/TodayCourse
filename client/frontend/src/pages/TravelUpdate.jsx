import "./TravelUpdate.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const TravelUpdate = ({ courses, updatePost }) => {
  const { regUserId } = useParams();
  const navigate = useNavigate();

  // 수정할 게시글 찾기
  const post = courses.find(
    (course) => course.regUserId === parseInt(regUserId)
  );

  // 상태 초기값 설정
  const [region, setRegion] = useState(post?.region || "");
  const [title, setTitle] = useState(post?.title || "");
  const [contents, setContents] = useState(post?.contents || "");
  const [costType, setCostType] = useState(post?.costType || "");
  const [travelStartDtDate, settravelStartDtDate] = useState(
    post?.days?.start ? new Date(post.days.travelStartDt) : null
  );
  const [travelEndDtDate, settravelEndDtDate] = useState(
    post?.days?.travelEndDt ? new Date(post.days.travelEndDt) : null
  );
  const [category, setCategory] = useState(post?.category || "");
  const [means, setMeans] = useState(post?.means || "");
  const [season, setSeason] = useState(post?.season || "");

  // 게시글이 변경될 때 상태 업데이트
  useEffect(() => {
    if (post) {
      setRegion(post.region);
      setTitle(post.title);
      setContents(post.contents);
      setCostType(post.costType);
      settravelStartDtDate(
        post.days?.travelStartDt ? new Date(post.days.travelStartDt) : null
      );
      settravelEndDtDate(
        post.days?.travelEndDt ? new Date(post.days.travelEndDt) : null
      );
      setCategory(post.category);
      setMeans(post.means);
    }
  }, [post]);

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    if (!title || !contents || !travelStartDtDate || !travelEndDtDate) {
      alert("제목, 내용 및 여행 날짜를 입력하세요!");
      return;
    }

    // 수정된 게시글 정보
    const updatedPost = {
      region,
      days: {
        travelStartDt: travelStartDtDate.toISOString().split("T")[0], // YYYY-MM-DD 형식 저장
        travelEndDt: travelEndDtDate.toISOString().split("T")[0],
        formatted: formatDays(travelStartDtDate, travelEndDtDate), // "1박 2일" 형식
      },
      title,
      contents,
      costType,
      category,
      means,
    };

    updatePost(post.regUserId, updatedPost);
    navigate(`/contents/${post.regUserId}`);
  };

  return (
    <>
      <Header />
      <div className="TravelUpdate-post">
        <h2>게시글 수정</h2>

        {/* 지역 선택 */}
        <label>지역</label>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="" disabled>
            지역을 선택해주세요.
          </option>
          <option value="서울">서울</option>
          <option value="대구">대구</option>
          <option value="부산">부산</option>
        </select>

        {/* 카테고리 선택 */}
        <label>카테고리</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>
          <option value="family">가족여행</option>
          <option value="drive">드라이브</option>
          <option value="camp">캠핑</option>
          <option value="tracking">트래킹</option>
          <option value="eat">맛집투어</option>
          <option value="leisure">레저여행</option>
          <option value="couple">데이트</option>
          <option value="bike">자전거여행</option>
        </select>

        {/* 계절 선택 */}
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

        {/* 날짜 선택 (캘린더) */}
        <div className="date-picker">
          <label>여행 시작일</label>
          <DatePicker
            selected={travelStartDtDate}
            onChange={(date) => settravelStartDtDate(date)}
            selectsStart
            travelStartDtDate={travelStartDtDate}
            travelEndDtDate={travelEndDtDate}
            dateFormat="yyyy-MM-dd"
            calendarClassName="DatePicker"
          />

          <label>여행 종료일</label>
          <DatePicker
            selected={travelEndDtDate}
            onChange={(date) => settravelEndDtDate(date)}
            selectsEnd
            travelStartDtDate={travelStartDtDate}
            travelEndDtDate={travelEndDtDate}
            minDate={travelStartDtDate}
            dateFormat="yyyy-MM-dd"
            calendarClassName="DatePicker"
          />
        </div>

        {/* 경비 선택 */}
        <label>경비</label>
        <select value={costType} onChange={(e) => setCostType(e.target.value)}>
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

        {/* 이동수단 선택 */}
        <label>이동수단</label>
        <select value={means} onChange={(e) => setMeans(e.target.value)}>
          <option value="" disabled>
            이동수단을 선택해주세요.
          </option>
          <option value="traffic">대중교통</option>
          <option value="car">자동차</option>
          <option value="tax">택시</option>
          <option value="walk">도보</option>
          <option value="cycle">자전거</option>
        </select>

        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 내용 입력 */}
        <textarea
          placeholder="내용을 입력하세요"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />

        {/* 버튼 */}
        <div className="TravelUpdate_btn">
          <Button onClick={handleSave} text="저장" />
          <Button
            onClick={() => navigate(`/contents/${post.regUserId}`)}
            text="취소"
          />
        </div>
      </div>
    </>
  );
};

export default TravelUpdate;
