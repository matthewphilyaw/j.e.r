import { component } from 'riot';
import VmEditor from './vm-editor.riot';

document.addEventListener('DOMContentLoaded', () => {
  component(VmEditor)(document.querySelector('vm-editor') || document.body);
});
