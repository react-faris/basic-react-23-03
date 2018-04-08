import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { connect } from 'react-redux'
import { selectByDate } from '../../ac'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
    render() {
        const { dateRange: {from, to} } = this.props;

        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        )
    }

    handleDayClick = (day) => {
        let { dateRange, selectByDate } = this.props;

        selectByDate(DateUtils.addDayToRange(day, dateRange));
    }
}

export default connect(({selectors: {dateRange}}) => ({dateRange}), { selectByDate })(DateRange)