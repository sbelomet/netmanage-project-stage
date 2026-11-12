import { ClientMembershipSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Client from '#models/client'
import Role from '#models/role'
import User from '#models/user'

export default class ClientMembership extends ClientMembershipSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
