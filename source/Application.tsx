import { difference, includes, sort, union } from 'ramda'
import { useEffect, useState } from 'react'
import { WebMidi } from 'webmidi'

const allNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const note = (pitch: number) => pitch % 12
const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const name1 = (pitch: number) => names[note(pitch)]
const octave = (pitch: number) => Math.floor((pitch - 12) / 12)
const range = (length: number) => Array.from({ length }, (_, index) => index)
const get = <T, P>(list: T[], index: number) =>
    list[((index % list.length) + list.length) % list.length]
const toBoolean = (indices: number[], length = 12) =>
    range(length).map((index) => indices.map(note).includes(index))

const root = [0]
const normal = []

const majorN = [0, 2, 4, 5, 7, 9, 11]
const mixolydian = [0, 2, 4, 5, 7, 9, 10]

const major = toBoolean(majorN)
const naturalMinor = toBoolean([0, 2, 3, 5, 7, 8, 10])
const melodicMinor = toBoolean([0, 2, 3, 5, 7, 9, 11])
const harmonicMinor = toBoolean([0, 2, 3, 5, 7, 8, 11])
const harmonicMajor = toBoolean([0, 2, 4, 5, 7, 8, 11])
const diminished = toBoolean([0, 2, 3, 5, 6, 8, 9, 11])
const augmented = toBoolean([0, 3, 4, 7, 8, 11])

const widthToLengthRatio = 1 / 9
const blackToWhiteRatio = 2 / 3

const findScale = (family: boolean[], pitches: number[]) =>
    allNotes
        .map((index) => pitches.every((note) => get(family, note - index)))
        .map((b, i) => (b ? i : -1))
        .filter((i) => i !== -1)

const findChord = (pitches: number[]) => {
    let chord = ''
    if (pitches[0] === 0) {
        chord += 'C'
    }
    if (pitches[0] === 0) {
        chord += 'C'
    }
}

export const Application = () => {
    const [count, setCount] = useState(0)

    const [pressed, setPressed] = useState<number[]>([])

    useEffect(() => {
        if (WebMidi.enabled) {
            const noteOn = (event: any) => {
                setPressed((pressed) =>
                    sort(
                        (a, b) => a - b,
                        union(pressed, [note(event.note.number)]),
                    ),
                )
            }
            const noteOff = (event: any) => {
                setPressed((pressed) =>
                    difference(pressed, [note(event.note.number)]),
                )
            }

            WebMidi.inputs[0].channels[1].addListener('noteon', noteOn)
            WebMidi.inputs[0].channels[1].addListener('noteoff', noteOff)

            return () => {
                WebMidi.inputs[0].channels[1].removeListener('noteon', noteOn)
                WebMidi.inputs[0].channels[1].removeListener('noteoff', noteOff)
            }
        } else {
            WebMidi.enable().then((a) => console.log(a))
        }
    }, [WebMidi.enabled])

    const black = difference(range(12), majorN)

    return (
        <div className='App'>
            <p>{findScale(major, pressed).map(name1).join(' ') + '-'}</p>
            <p>{pressed.map(name1).join() + '-'}</p>
            <svg width='100vw' height='50vh' viewBox='0 0 13 9'>
                {range(7).map((index) => (
                    <rect
                        x={(index * 12) / 7}
                        width={12 / 7}
                        height='9'
                        fill='white'
                        stroke='gray'
                        strokeWidth='0.01'
                    />
                ))}
                {black.map((index) => (
                    <rect
                        x={index}
                        width={1}
                        height='6'
                        fill='black'
                        stroke='gray'
                        strokeWidth='0.01'
                    />
                ))}
                {pressed.map((index) => (
                    <circle
                        cx={index + 0.5}
                        r={0.4}
                        fill='gray'
                        cy={includes(index, black) ? 3 : 6 + 3 / 2}
                    />
                ))}
            </svg>
            <p>
                <button
                    type='button'
                    onClick={() => setCount((count) => count + 1)}
                >
                    count is: {count}
                </button>
            </p>
        </div>
    )
}
