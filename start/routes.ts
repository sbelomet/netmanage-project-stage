/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('/', [controllers.Posts, 'index'])

    router
      .group(() => {
        router.get('/create', [controllers.Posts, 'create'])
        router.post('/', [controllers.Posts, 'store'])
      })
      .use(middleware.auth())

    router.get('/:id', [controllers.Posts, 'show'])

    router
      .group(() => {
        router.get('/:id/edit', [controllers.Posts, 'edit'])
        router.put('/:id', [controllers.Posts, 'update'])
        router.delete('/posts/:id', [controllers.Posts, 'destroy'])
        router.post('/:id/comments', [controllers.Comments, 'store'])
      })
      .use(middleware.auth())
  })
  .prefix('/posts')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/dashboard', [controllers.Dashboard, 'show']).as('dashboard')
    router
      .get('/clients/:clientSlug/admin/:id', [controllers.ClientAdmins, 'show'])
      .as('clients.admin.show')
    router
      .get('/clients/:clientSlug/departments/:id', [controllers.Departments, 'show'])
      .as('departments.show')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())
