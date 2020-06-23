import {unthinkResource, view} from '@epandco/unthink-foundation';


export default unthinkResource({
  name: 'Root',
  routes: [
    view('/', 'vm-editor.njk')
  ]
});
