import { ClientAdminSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from '#models/client'
import User from '#models/user'

export default class ClientAdmin extends ClientAdminSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>
}
