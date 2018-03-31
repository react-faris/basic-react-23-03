import React, { PureComponent } from 'react'
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const MONTH = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const FIRST_DAY_OF_WEEK = 1;

class DatePicker extends PureComponent {
    state = {
        from: null,
        to: null,
        highlight: null
    }

    render() {
        let {from, to, highlight} = this.state,
            end = to || highlight,
            start = from;
        if (start > end) {
            ({start: end, end: start} = {start, end})
        }

        let helpMes = (!from && !to) ? "Выберите первую границу"
            : (from && to) ? "Выберите дату, чтобы изменить диапазон или нажмите на границу чтобы открепить ее" : "Выберите вторую границу",
            range = (start) ? `От: ${start.toLocaleDateString()}, до: ${end.toLocaleDateString()}.` : "Диапазон не выбран.";

        return (
            <div>
                <p>{helpMes}</p>
                <p>{range}</p>
                <DayPicker
                    className="Selectable"
                    months={MONTH}
                    weekdaysShort={WEEKDAYS_SHORT}
                    firstDayOfWeek={FIRST_DAY_OF_WEEK}
                    selectedDays={{from: start, to: end}}
                    modifiers={{start, end}}
                    onDayClick={this.handleDayClick}
                    onDayMouseEnter={this.handleDayMouseEnter}
                />
                <button onClick={this.onClickReset}>Снять выделение</button>

                <style>{`
                          .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                            background-color: #f0f8ff !important;
                            color: #4a90e2;
                          }
                          .Selectable .DayPicker-Day {
                            border-radius: 0 !important;
                          }
                          .Selectable .DayPicker-Day--start {
                            border-top-left-radius: 50% !important;
                            border-bottom-left-radius: 50% !important;
                          }
                          .Selectable .DayPicker-Day--end {
                            border-top-right-radius: 50% !important;
                            border-bottom-right-radius: 50% !important;
                          }
                    `}</style>
            </div>
        )
    }

    handleDayClick = day => {
        let {from, to, highlight} = this.state;
        if (to && DateUtils.isSameDay(day, from)) {
            from = to;
            to = null;
            highlight = day;
        } else if(from && DateUtils.isSameDay(day, to)) {
            to = null;
            highlight = day;
        } else if (from && to || !from) {
            from = day;
            to = null;
            highlight = day;
        } else {
            ({from, to} = DateUtils.addDayToRange(day, this.state));
        }

        this.setState({from, to, highlight});
    }

    handleDayMouseEnter = day => {
        let {from, to} = this.state;
        if (from && !to) this.setState({from, highlight: day})
    }

    onClickReset = () => this.setState({from: null, to: null})
}

export default DatePicker