import { expect, test } from 'vitest'

export function sum(a: number, b: number) {
    return a + b
  }

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

// run test in frontend/ `npm run test`