import VersionResource from './resources/version-resource';
import MissingRouteResource from './resources/missing-route-resource';

/** Add new resources to the list below */
export default [
  VersionResource,

  /* To catch all routes not defined by the resources above */
  MissingRouteResource
];
