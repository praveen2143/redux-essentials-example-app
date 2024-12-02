import { formatDistanceToNow, parseISO } from "date-fns"

interface TimeAgoProps{
    timestamp : string
}

export const TimeAgo = ({ timestamp} : TimeAgoProps ) => {
    let timeAgo = ''

    if(timestamp){
        let date = parseISO(timestamp)
        let timePeriod = formatDistanceToNow(date)

        timeAgo = `${timePeriod} ago`
    }

    return (
        <>
        <time dateTime={timestamp} title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
        </time>
        </>
    )
}