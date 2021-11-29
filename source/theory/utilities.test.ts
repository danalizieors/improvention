import { range, repeat } from 'ramda'
import { get, note, octave, toBooleans, toIndices } from './utilities'

test('octave', () => {
    expect(octave(59)).toBe(3)
    expect(octave(60)).toBe(4)
    expect(octave(61)).toBe(4)
})

test('note', () => {
    expect(note(59)).toBe(11)
    expect(note(60)).toBe(0)
    expect(note(61)).toBe(1)
})

test('get', () => {
    const list = [0, 1, 2, 3]

    expect(get(list, -1)).toBe(3)
    expect(get(list, 0)).toBe(0)
    expect(get(list, 1)).toBe(1)

    expect(get(list, -5)).toBe(3)
    expect(get(list, 4)).toBe(0)

    expect(get([], 0)).toBe(undefined)
})

test('toBooleans', () => {
    expect(toBooleans([])).toStrictEqual(repeat(false, 12))
    expect(toBooleans(range(0, 12))).toStrictEqual(repeat(true, 12))

    expect(toBooleans([0, 1, 3])).toStrictEqual([
        true,
        true,
        false,
        true,
        ...repeat(false, 8),
    ])
})

test('toIndices', () => {
    expect(toIndices(repeat(false, 12))).toStrictEqual([])
    expect(toIndices(repeat(true, 12))).toStrictEqual(range(0, 12))

    expect(
        toIndices([true, true, false, true, ...repeat(false, 8)]),
    ).toStrictEqual([0, 1, 3])
})
