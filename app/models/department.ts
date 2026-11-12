import { DepartmentSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Client from '#models/client'
import DepartmentMembership from '#models/department_membership'

export default class Department extends DepartmentSchema {
  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => DepartmentMembership)
  declare department_membership: HasMany<typeof DepartmentMembership>
}
