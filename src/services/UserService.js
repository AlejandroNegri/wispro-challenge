import _ from "lodash";

export function Edit(userList, values) {
  //API CALL HERE...
  values.date = values.date.format("DD/MM/YYYY");
  var index = _.findIndex(userList, { key: values.key });
  userList.splice(index, 1, values);
  return userList;
}

export function Delete(userList, key) {
  //API CALL HERE...
  _.remove(userList, { key: key });
  return userList;
}
