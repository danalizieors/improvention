import { map, pipe, range } from 'ramda'

export const maximallySpread = (steps: number) => (hits: number) => {
    const offset = Math.floor((2 * hits) / (steps + 1))

    return pipe(
        () => range(0, hits),
        map(
            (step: number) =>
                Math.floor(((step + offset) * steps) / hits) - offset,
        ),
    )()
}
