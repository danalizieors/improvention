export const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
] as const

export const scales = {
    major: [0, 2, 4, 5, 7, 9, 11],
    naturalMinor: [0, 2, 3, 5, 7, 8, 10],
    melodicMinor: [0, 2, 3, 5, 7, 9, 11],
    harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
    harmonicMajor: [0, 2, 4, 5, 7, 8, 11],
    diminished: [0, 2, 3, 5, 6, 8, 9, 11],
    augmented: [0, 3, 4, 7, 8, 11],
} as const
