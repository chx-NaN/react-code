import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.css';

//增加两个参数,这俩参数和 antd 的 Calendar 组件一样
interface CalendarProps {
  //value 参数设置为 date 的初始值
  value?: Date,
  onChange?: (date: Date) => void
}

interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void,
}

const InternalCalendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  
  //用一个 state 来保存当前的日期，默认值是今天
  //const [date, setDate] = useState(new Date());
  const {
    value = new Date(),
    onChange,
  } = props;

  const [date, setDate] = useState(value);

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date)
      }
    }
  });

  //点击左右按钮，会切换到上个月、下个月的第一天
  const handlePrevMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  // 渲染的年月要改为当前 date 对应的年月
  const monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];

  // 日期部分
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
      if(i === date.getDate()) {
        days.push(<div key={i} className="day selected" onClick={clickHandler}>{i}</div>);  
      } else {
        days.push(<div key={i} className="day" onClick={clickHandler}>{i}</div>);
      }
    }

    return days;
  };


  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()}年{monthNames[date.getMonth()]}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDays()}
      </div>
    </div>
  );
}


const Calendar = React.forwardRef(InternalCalendar);

function Test() {
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1));
    }, 3000);
  }, []);

  return <div>
    {/* <Calendar value={new Date('2023-3-1')} onChange={(date: Date) => {
        alert(date.toLocaleDateString());
    }}></Calendar> */}
    <Calendar ref={calendarRef} value={new Date('2024-8-15')}></Calendar>
  </div>
}
export default Test;
// export default Calendar;
