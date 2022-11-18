export const sleep = (m: number) => new Promise(r => setTimeout(r, m))

export const useTime = (): (() => number)[] => {
  let internTimeline = document.timeline.currentTime ?? 0
  const pickedTime = () => internTimeline
  const getNewTime = () => internTimeline = document.timeline.currentTime ?? 0
  return [pickedTime, getNewTime]
}