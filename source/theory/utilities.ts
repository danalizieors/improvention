import { filter, includes, map, pipe, range } from 'ramda'

export const period = 12

export const octave = (pitch: number) => Math.floor(pitch / period) - 1
export const note = (pitch: number) => pitch % period

export const get = <T>(list: T[], index: number) =>
    list[((index % list.length) + list.length) % list.length]

export const toBooleans = (indices: number[], length = period) =>
    pipe(
        () => range(0, length),
        map((index) => includes(index, indices)),
    )()

export const toIndices = (booleans: boolean[]) =>
    pipe(
        () => range(0, booleans.length),
        filter((index: number) => booleans[index]),
    )()
