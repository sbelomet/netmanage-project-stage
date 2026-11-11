import { DepartmentSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import DepartmentMembership from '#models/department_membership'

export default class Department extends DepartmentSchema {
    /**
     * A department has many department memberships
     */
    @hasMany(() => DepartmentMembership)
    declare department_membership: HasMany<typeof DepartmentMembership>
}