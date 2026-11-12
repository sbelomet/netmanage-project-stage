import { RoleSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import DepartmentMembership from '#models/department_membership'

export default class Role extends RoleSchema {
  @hasMany(() => DepartmentMembership)
  declare departmentMemberships: HasMany<typeof DepartmentMembership>
}
