import "./Travel.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CourseList from "../components/TravelList";
import Footer from "../components/Footer";
import Button from "../components/Button";

const Travel = ({ courses, addPost }) => {
  const navigate = useNavigate();

  // 새 여행 코스를 추가하는 페이지로 이동
  const goToNewPage = () => {
    navigate(`/new`);
  };

  return (
    <>
      <Header />

      <div className="Travel">
        <CourseList courses={courses} />
        <div className="course-list-btn">
          {/* 새 여행 코스 추가 버튼 */}
          <Button
            className="Button_1"
            onClick={goToNewPage}
            style={{ marginBottom: "10px" }}
            text={"+ 새 여행 코스 추가"}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Travel;
