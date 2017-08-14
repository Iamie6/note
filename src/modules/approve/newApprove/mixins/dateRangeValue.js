/**
*
*/
export default {
	methods:{
		//时间转换为json形式
		timeToJson(option){
			let beginYear,beginMonth,beginDay,beginHour,beginMinute,
				endYear,endMonth,endDay,endHour,endMinute,
				days,hours,minutes,
				beginDate,endDate,
				timeDiff
			beginDate=option[0]
			endDate=option[1]
			beginYear=beginDate.getFullYear()
			beginMonth=beginDate.getMonth()<10?'0'+beginDate.getMonth():beginDate.getMonth()
			beginDay=beginDate.getDay()<10?'0'+beginDate.getDay():beginDate.getDay()
			beginHour=beginDate.getHours()<10?'0'+beginDate.getHours():beginDate.getHours()
			beginMinute=beginDate.getMinutes()<10?'0'+beginDate.getMinutes():beginDate.getMinutes()

			endYear=endDate.getFullYear()
			endMonth=endDate.getMonth()<10?'0'+endDate.getMonth():endDate.getMonth()
			endDay=endDate.getDay()<10?'0'+endDate.getDay():endDate.getDay()
			endHour=endDate.getHours()<10?'0'+endDate.getHours():endDate.getHours()
			endMinute=endDate.getMinutes()<10?'0'+endDate.getMinutes():endDate.getMinutes()

			timeDiff=endDate.getTime()-beginDate.getTime()
			days=timeDiff/(24*60*60*1000)
			let dayRemain=timeDiff%(24*60*60*1000)
			hours=dayRemain/(60*60*1000)
			let hourRemain=dayRemain%(60*60*1000)
			minutes=hourRemain/(60*1000)
			let dateJson={
				beginDate:beginYear+''+beginMonth+''+beginDay,
				beginTime:beginHour+''+beginMinute,
				endDate:endYear+''+endMonth+''+endDay,
				endTime:endHour+''+endMinute,
				days:days,
				hours:hours,
				minutes:minutes
			}
			return JSON.stringify(dateJson)
		},
		//json形式转换为时间格式
		jsonToTime(option){
			let beginYear,beginMonth,beginDay,beginHour,beginMinute,
				endYear,endMonth,endDay,endHour,endMinute
			beginYear=option.beginDate.substr(0,4)
			beginMonth=Number(option.beginDate.substr(4,2))-1
			beginDay=option.beginDate.substr(6,2)
			beginHour=option.beginTime.substr(0,2)
			beginMinute=option.beginTime.substr(2,2)

			endYear=option.endDate.substr(0,4)
			endMonth=Number(option.endDate.substr(4,2))-1
			endDay=option.endDate.substr(6,2)
			endHour=option.endTime.substr(0,2)
			endMinute=option.endTime.substr(2,2)
			let beginDate=new Date(beginYear,beginMonth,beginDay,beginHour,beginMinute)
			let endDate=new Date(endYear,endMonth,endDay,endHour,endMinute)
			let dateArr=[]
			dateArr.push(beginDate)
			dateArr.push(endDate)
			return dateArr
		}
	}
}