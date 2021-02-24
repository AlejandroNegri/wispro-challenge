import authData from "../data/AuthData";
import _ from "lodash";

export function Login(values) {
  //API CALL HERE...
  return _.isEqual(values, authData);
}
