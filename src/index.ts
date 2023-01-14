import { Context, Schema, h } from 'koishi'

export const name = 'random-dog'

export interface Config {
  url: string
}

export const Config: Schema<Config> = Schema.object({
  url: Schema.string().description('数据源').default('https://random.dog/woof.json?include=jpg')
})

export function apply(ctx: Context, config: Config) {
  const logger = ctx.logger(name)
  ctx.command('random.dog').action(() => ctx.http.get(config.url).then(data => h.image(data.url)).catch((error) => logger.error(error)))
}