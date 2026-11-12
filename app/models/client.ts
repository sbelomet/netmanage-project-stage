import { ClientSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ClientAdmin from '#models/client_admin'

export default class Client extends ClientSchema {
  @hasMany(() => ClientAdmin)
  declare admins: HasMany<typeof ClientAdmin>
}
