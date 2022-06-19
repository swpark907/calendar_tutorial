import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Calendar = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Header = styled.div`
  width: 100%;
`;

const DateForm = styled.div`
  width: calc(100% / 7);
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

  useEffect(() => {
    console.log(LASTDATE);
    console.log(currentYear, currentMonth, currentDate);
    // console.log(DAYOFFIRST)
    console.log(Week[DAYOFFIRST]);
  });

  return (
    <div className="App">
      <Header>{currentMonth + "월 " + currentDate + "일"}</Header>
      <Calendar>
        {[...Array(LASTDATE)].map((date, index) => (
          <DateForm>{Number(index) + 1}</DateForm>
        ))}
      </Calendar>
    </div>
  );
}

export default App;
