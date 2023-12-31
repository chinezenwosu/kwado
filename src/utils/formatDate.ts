import moment from 'moment'

moment.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'L',
  },
  relativeTime: {
    past: '%s ago',
    s: 'a few seconds',
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
    yy: '%d years',
  },
})

const formatDate = {
  fromNow: (dateStr: string, skipSuffix?: boolean) => {
    return moment(dateStr).fromNow(skipSuffix)
  },
  calendar: (dateStr: string, format = 'Do MMM YYYY') => {
    return moment(dateStr).format(format)
  },
}

export default formatDate
