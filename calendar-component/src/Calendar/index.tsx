import { Dayjs } from 'dayjs';
import MonthCalendar from './MonthCalendar';
import './index.scss';

export interface CalendarProps {
    value: Dayjs
}

function Calendar(props: CalendarProps) {
    return <div className="calendar">
        <MonthCalendar {...props}/>
    </div>
}

export default Calendar;
