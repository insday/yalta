/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home';
import Catalog from '@/components/Catalog/Catalog';
import Object from '@/components/Object/Object';
import News from '@/components/News/News';
import Single from '@/components/Single/Single';
import Profile from '@/components/Profile/Profile';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/catalogue',
      name: 'Catalog',
      component: Catalog,
      props: (route) => ({
        type: route.query.type
      })
    },
    {
      path: '/events',
      name: 'News',
      component: News,
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/events/:singleId',
      name: 'Single',
      component: Single,
      props: true
    },
    {
      path: '/object/:objectId',
      name: 'Object',
      component: Object
    }
  ],
});

export default router;

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});
