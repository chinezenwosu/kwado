import moment from 'moment'

moment.locale('en', {
  calendar : {
    lastDay : '[Yesterday at] LT',
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    lastWeek : '[last] dddd [at] LT',
    nextWeek : 'dddd [at] LT',
    sameElse : 'L'
  },
  relativeTime : {
    past: '%s ago',
    s: 'just now',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },
})

const formatDate = {
  fromNow: (dateStr: string, skipSuffix?: boolean) => {
    return moment(dateStr).fromNow(skipSuffix)
  },
}

export default formatDate
