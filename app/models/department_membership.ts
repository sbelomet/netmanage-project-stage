import { DepartmentMembershipSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Department from '#models/department'
import Role from '#models/role'

export default class DepartmentMembership extends DepartmentMembershipSchema {
  /**
   * A department membership belongs to a user
   */
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /**
   * A department membership belongs to a department
   */
  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
