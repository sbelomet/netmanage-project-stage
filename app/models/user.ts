import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import DepartmentMembership from '#models/department_membership'
import ClientMembership from '#models/client_membership'


export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  /**
     * A user has many department memberships
     */
    @hasMany(() => DepartmentMembership)
    declare department_membership: HasMany<typeof DepartmentMembership>

  /**
     * A user has many client memberships
     */
    @hasMany(() => ClientMembership)
    declare client_membership: HasMany<typeof ClientMembership>
}
