import "./App.css";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const Button = styled.button`
  padding: 0.3em 1em;
`;

const Calendar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Header = styled.div`
  width: 100%;
`;

const DateForm = styled.div`
  width: calc(100% / 7.3);
  height: 200px;
  border-right: solid 1px grey;
  border-top: solid 1px grey;
  background-color: #fff;
`;

function App() {
  const NOW = new Date();
  const YEAR = NOW.getFullYear();
  const DATE = NOW.getDate();
  const MONTH = NOW.getMonth() + 1;
  const LAST = new Date(YEAR, MONTH, 0);
  const LASTDATE = LAST.getDate();
  const DAYOFFIRST = new Date(YEAR, MONTH - 1, 1).getDay();
  const Week = ["일", "월", "화", "수", "목", "금", "토"];

  const [currentYear, setCurrentYear] = useState(YEAR);
  const [currentMonth, setCurrentMonth] = useState(MONTH);
  const [currentDate, setCurrentDate] = useState(DATE);

  const [dateList, setDateList] = useState([]);

  const getCalendarLine = () => {
    // 현재 달의 첫째날의 요일
    const dayOfFirst = new Date(currentYear, currentMonth - 1).getDay();
    const dayOfLast = new Date(currentYear, currentMonth, -1).getDay();

    let dateOfCount = 0;
    dayOfFirst >= 4 ? (dateOfCount = 41) : (dateOfCount = 34);

    const data = [];

    for (let i = -dayOfFirst + 1; i <= dateOfCount - dayOfFirst + 1; i++) {
      const day = new Date(currentYear, currentMonth - 1, i);
      data.push(day);
    }
    setDateList(data);
  };

  useEffect(() => {
    getCalendarLine();
  }, [currentMonth]);

  useEffect(() => {
    console.log(currentMonth)
  });

  // const formChanger = (date) => {
  //   const year = date.getFullYear().toString();
  //   const month =
  //     date.getMonth() + 1 < 10
  //       ? "0" + (date.getMonth() + 1).toString()
  //       : (date.getMonth() + 1).toString();
  //   const day =
  //     date.getDate() < 10
  //       ? "0" + date.getDate().toString()
  //       : date.getDate().toString();
  //   return year + month + day;
  // };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };

  const goToPrevMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };

  const dateRefs = useRef([]);

  const formChanger = (date) => {
    const year = date.getFullYear().toString();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1).toString()
        : (date.getMonth() + 1).toString();
    const day =
      date.getDate() < 10
        ? "0" + date.getDate().toString()
        : date.getDate().toString();
    return Number(year + month + day);
  };

  const dateOnclick = (e) => {
    const target = e.currentTarget;

    const dateData = target.dataset.date;
    const year = Number(dateData.substr(0, 4));
    const month = Number(dateData.substr(4, 2));
    const date = Number(dateData.substr(6));
    if (month !== currentMonth) {
      setCurrentYear(Number(year));
      setCurrentMonth(Number(month));
      console.log(month)
    }

    dateRefs.current.map((el) => {
      if (el.dataset.date === target.dataset.date) {
        el.classList.add("selected");
        // API로 받아온 그날의 data 넣기
      } else {
        el.classList.remove("selected");
      }
    });
  };

  return (
    <div className="App">
      <Button onClick={goToPrevMonth}>이전</Button>
      <Header>{currentMonth + "월 "}</Header>
      <Button onClick={goToNextMonth}>다음</Button>
      <Calendar>
        {dateList.map((date, index) => (
          <DateForm
            key={index}
            ref={(el) => dateRefs.current.push(el)}
            // data-year={date.getFullYear()}
            // data-month={date.getMonth()}
            // data-date={date.getDate()}
            data-date={formChanger(date)}
            onClick={dateOnclick}
          >
            {date.getDate()}
          </DateForm>
        ))}
      </Calendar>
    </div>
  );
}

export default App;
//
