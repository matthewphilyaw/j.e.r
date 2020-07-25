import {unthinkResource, view, ViewResult} from '@epandco/unthink-foundation';


export default unthinkResource({
  name: 'Root',
  routes: [
    view('/', async () => ViewResult.ok('main-app.njk', {
      value: {
        activeMenuSlug: 'bio'
      }
    })),
    view('/contact', async () => ViewResult.ok('main-app.njk', {
      value: {
        activeMenuSlug: 'contact'
      }
    })),
    view('/vm', 'vm-editor.njk')
  ]
});
