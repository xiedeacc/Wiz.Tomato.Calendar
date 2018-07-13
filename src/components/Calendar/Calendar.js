import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './Calendar.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        events: []
    }
  }
 
  render() {
    return (
      <div id="calendar-container">
        <FullCalendar
            // 基本配置
            id = "calendar"
            themeSystem = 'standard'
            height = 'parent'
            header = {{
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            }}
            // 中文化
            buttonText = {{
                today: '今天',
                month: '月',
                week: '周',
                day: '日',
                list: '表'
            }}
            monthNames = {[
                '1月', '2月', '3月', '4月', 
                '5月', '6月', '7月', '8月', 
                '9月', '10月', '11月', '12月'
            ]}
            monthNamesShort = {[
                '1月', '2月', '3月', '4月', 
                '5月', '6月', '7月', '8月', 
                '9月', '10月', '11月', '12月'
            ]}
            dayNames = {[
                '周日', '周一', '周二', '周三', '周四', '周五', '周六'
            ]}
            dayNamesShort = {[
                '周日', '周一', '周二', '周三', '周四', '周五', '周六'
            ]}
            allDayText = '全天'
            // 设置视图
            defaultView = 'agendaWeek'
            nowIndicator = {true}
            firstDay = {1}
            views = {{
                agenda: {
                    minTime: "08:00:00",
                    slotLabelFormat: 'h(:mm) a'
                }           
            }}
            navLinks= {true}
            allDayDefault = {false}
            eventLimit= {true}
            // 设置事件
            selectable = {true}
            selectHelper = {true}
            editable = {true}
            forceEventDuration = {true}
            // 设置UI
            unselectCancel = '.modal *'
            dragOpacity = {{
                "month": .5,
                "agendaWeek": 1,
                "agendaDay": 1
            }}
            // 设置事件句柄
            
        />
      </div>
    );
  }
}