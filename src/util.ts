import Context from './context'

export const env = process.env

export function assert<C extends Context, T extends keyof C>(
  ctx: C,
  value: T,
  method: string
): asserts ctx is C & { [k in T]: NonNullable<C[T]> } {
  if (ctx[value] === undefined) {
    throw new TypeError(
      `Telegraf: "${method}" isn't available for "${ctx.updateType}"`
    )
  }
}

export function deprecate(
  method: string,
  ignorable: string | undefined,
  use: string | undefined,
  see?: string
) {
  // don't use deprecate() yet
  // wait for a couple minor releases of telegraf so the news reaches more people
  return

  const ignorer = `IGNORE_DEPRECATED_${ignorable}`
  if (env[ignorer]) return

  const stack: { stack: string } = { stack: '' }
  Error.captureStackTrace(stack)
  const line = (stack.stack.split('\n')[3] || '').trim()

  const useOther = use ? `; use ${use} instead` : ''
  const pad = ' '.repeat('[WARN]'.length)

  console.warn(`[WARN] ${method} is deprecated${useOther}`)
  if (line) console.warn(pad, line)
  if (see) console.warn(pad, `SEE ${see}`)
}
