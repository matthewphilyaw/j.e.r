import VersionResource from './resources/version-resource';
import VmEditorResource from './resources/main-app';
import MissingRouteResource from './resources/missing-route-resource';

/** Add new resources to the list below */
export default [
  VersionResource,
  VmEditorResource,

  /* To catch all routes not defined by the resources above */
  MissingRouteResource
];
