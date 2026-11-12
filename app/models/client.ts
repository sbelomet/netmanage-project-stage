import { ClientSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ClientMembership from '#models/client_membership'
import Department from '#models/department'

export default class Client extends ClientSchema {
  @hasMany(() => ClientMembership)
  declare client_membership: HasMany<typeof ClientMembership>

  @hasMany(() => Department)
  declare departments: HasMany<typeof Department>
}
