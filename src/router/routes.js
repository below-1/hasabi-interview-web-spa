
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'peserta', component: () => import('pages/peserta/ListPage.vue') },
      { path: 'peserta/add', component: () => import('pages/peserta/AddPage.vue') },
      { path: 'soal', component: () => import('pages/soal/ListPage.vue') },
      { path: 'soal/add', component: () => import('pages/soal/AddPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
