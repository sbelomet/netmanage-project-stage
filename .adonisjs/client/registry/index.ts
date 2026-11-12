/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'posts.index': {
    methods: ["GET","HEAD"],
    pattern: '/posts',
    tokens: [[0,"posts"]],
    types: placeholder as Registry['posts.index']['types'],
  },
  'posts.create': {
    methods: ["GET","HEAD"],
    pattern: '/posts/create',
    tokens: [[0,"posts"],[0,"create"]],
    types: placeholder as Registry['posts.create']['types'],
  },
  'posts.store': {
    methods: ["POST"],
    pattern: '/posts',
    tokens: [[0,"posts"]],
    types: placeholder as Registry['posts.store']['types'],
  },
  'posts.show': {
    methods: ["GET","HEAD"],
    pattern: '/posts/:id',
    tokens: [[0,"posts"],[1,"id"]],
    types: placeholder as Registry['posts.show']['types'],
  },
  'posts.edit': {
    methods: ["GET","HEAD"],
    pattern: '/posts/:id/edit',
    tokens: [[0,"posts"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['posts.edit']['types'],
  },
  'posts.update': {
    methods: ["PUT"],
    pattern: '/posts/:id',
    tokens: [[0,"posts"],[1,"id"]],
    types: placeholder as Registry['posts.update']['types'],
  },
  'posts.destroy': {
    methods: ["DELETE"],
    pattern: '/posts/posts/:id',
    tokens: [[0,"posts"],[0,"posts"],[1,"id"]],
    types: placeholder as Registry['posts.destroy']['types'],
  },
  'comments.store': {
    methods: ["POST"],
    pattern: '/posts/:id/comments',
    tokens: [[0,"posts"],[1,"id"],[0,"comments"]],
    types: placeholder as Registry['comments.store']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [[0,"dashboard"]],
    types: placeholder as Registry['dashboard']['types'],
  },
  'clients.admin.show': {
    methods: ["GET","HEAD"],
    pattern: '/clients/:clientSlug/admin/:id',
    tokens: [[0,"clients"],[1,"clientSlug"],[0,"admin"],[1,"id"]],
    types: placeholder as Registry['clients.admin.show']['types'],
  },
  'departments.show': {
    methods: ["GET","HEAD"],
    pattern: '/clients/:clientSlug/departments/:id',
    tokens: [[0,"clients"],[1,"clientSlug"],[0,"departments"],[1,"id"]],
    types: placeholder as Registry['departments.show']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
