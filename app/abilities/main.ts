/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import ClientAdmin from '#models/client_admin'
import DepartmentMembership from '#models/department_membership'
import type Department from '#models/department'
import type User from '#models/user'

export const viewDepartmentContent = Bouncer.ability(
  async (user: User, department: Department) => {
    const clientAdmin = await ClientAdmin.query()
      .where('userId', user.id)
      .where('clientId', department.clientId)
      .first()

    if (clientAdmin) return true

    const departmentMembership = await DepartmentMembership.query()
      .where('userId', user.id)
      .where('departmentId', department.id)
      .first()

    return Boolean(departmentMembership)
  }
)