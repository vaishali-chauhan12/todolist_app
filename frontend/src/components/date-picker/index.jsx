import React from "react"
import { DatePicker } from "antd"
import {formatDate} from "../../utils"
import dayjs from 'dayjs';


export default function CustomDatePicker({ setDate, setCalenderVisibility, value }) {
  const datePickerValue = value ? dayjs(formatDate(value)) : undefined

  function changeHandler(date, dateString) {
    setDate(dateString)
  }

  return (
    <DatePicker
      placeholder='YYYY-MM-DD'
      onChange={changeHandler}
      // needConfirm
      popupClassName="calender-input"
      onOpenChange={setCalenderVisibility}
      value={datePickerValue}
    />
  )
}
