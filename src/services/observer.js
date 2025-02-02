export const createDayIntersectionObserver = (callback, intersections) => {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dayId = entry.target.getAttribute('data-day')
            if (dayId) {
              if (!intersections[dayId]) {
                intersections[dayId] = 0
              }
              intersections[dayId]++
            }
            callback(dayId)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )
  }
  