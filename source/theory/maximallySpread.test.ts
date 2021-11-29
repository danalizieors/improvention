import { range } from 'ramda'
import { maximallySpread } from './maximallySpread'

test('empty scale', () => {
    expect(maximallySpread(12)(0)).toStrictEqual([])
})

test('simple scale', () => {
    expect(maximallySpread(4)(2)).toStrictEqual([0, 2])
})

test('pentatonic scale', () => {
    expect(maximallySpread(12)(5)).toStrictEqual([0, 2, 4, 7, 9])
})

test('whole tone scale', () => {
    expect(maximallySpread(12)(6)).toStrictEqual([0, 2, 4, 6, 8, 10])
})

test('diatonic scale', () => {
    expect(maximallySpread(12)(7)).toStrictEqual([0, 2, 4, 5, 7, 9, 11])
})

test('augmented scale', () => {
    expect(maximallySpread(12)(8)).toStrictEqual([0, 2, 3, 5, 6, 8, 9, 11])
})

test('chromatic scale', () => {
    expect(maximallySpread(12)(12)).toStrictEqual(range(0, 12))
})
