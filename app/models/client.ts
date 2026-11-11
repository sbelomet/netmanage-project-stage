import { ClientSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ClientMembership from '#models/client_membership'

export default class Client extends ClientSchema {
    /**
     * A department has many department memberships
     */
    @hasMany(() => ClientMembership)
    declare client_membership: HasMany<typeof ClientMembership>
}