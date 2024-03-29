import React, { useState } from "react"
import { DatePicker } from "antd"

export default function CustomDatePicker({ setDate, setCalenderVisibility }) {
  function onChange(date, dateString) {
    console.error("onChange", date)
    setDate(date)
  }

  return (
    <DatePicker
      onChange={onChange}
      needConfirm
      popupClassName="calender-input"
      onOpenChange={setCalenderVisibility}
    />
  )
}
