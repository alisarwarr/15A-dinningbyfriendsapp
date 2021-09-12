/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      result
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: ID!, $name: String!) {
    deleteUser(id: $id, name: $name) {
      result
    }
  }
`;
export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $name: String!
    $cuisine: String!
    $address: String!
  ) {
    createRestaurant(name: $name, cuisine: $cuisine, address: $address) {
      result
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      result
    }
  }
`;
export const createUserfriend = /* GraphQL */ `
  mutation CreateUserfriend($idFrom: ID!, $idTo: ID!) {
    createUserfriend(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteUserfriend = /* GraphQL */ `
  mutation DeleteUserfriend($id: ID!) {
    deleteUserfriend(id: $id) {
      result
    }
  }
`;
export const createUserrestaurant = /* GraphQL */ `
  mutation CreateUserrestaurant($idFrom: ID!, $idTo: ID!) {
    createUserrestaurant(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteUserrestaurant = /* GraphQL */ `
  mutation DeleteUserrestaurant($id: ID!) {
    deleteUserrestaurant(id: $id) {
      result
    }
  }
`;
export const createRestaurantuser = /* GraphQL */ `
  mutation CreateRestaurantuser($idFrom: ID!, $idTo: ID!) {
    createRestaurantuser(idFrom: $idFrom, idTo: $idTo) {
      result
    }
  }
`;
export const deleteRestaurantuser = /* GraphQL */ `
  mutation DeleteRestaurantuser($id: ID!) {
    deleteRestaurantuser(id: $id) {
      result
    }
  }
`;
export const createRestaurantuserreview = /* GraphQL */ `
  mutation CreateRestaurantuserreview(
    $idFrom: ID!
    $idTo: ID!
    $hisName: String!
    $text: String!
  ) {
    createRestaurantuserreview(
      idFrom: $idFrom
      idTo: $idTo
      hisName: $hisName
      text: $text
    ) {
      result
    }
  }
`;
export const deleteRestaurantuserreview = /* GraphQL */ `
  mutation DeleteRestaurantuserreview($r_id: ID!) {
    deleteRestaurantuserreview(r_id: $r_id) {
      result
    }
  }
`;
export const editRestaurantuserreview = /* GraphQL */ `
  mutation EditRestaurantuserreview($r_id: ID!, $text: String!) {
    editRestaurantuserreview(r_id: $r_id, text: $text) {
      result
    }
  }
`;
export const createRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation CreateRestaurantuserreviewpersonalization(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
    $hisName: String!
    $useful: Boolean!
  ) {
    createRestaurantuserreviewpersonalization(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
      hisName: $hisName
      useful: $useful
    ) {
      result
    }
  }
`;
export const deleteRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation DeleteRestaurantuserreviewpersonalization($p_id: ID!) {
    deleteRestaurantuserreviewpersonalization(p_id: $p_id) {
      result
    }
  }
`;
export const editRestaurantuserreviewpersonalization = /* GraphQL */ `
  mutation EditRestaurantuserreviewpersonalization(
    $p_id: ID!
    $useful: Boolean!
  ) {
    editRestaurantuserreviewpersonalization(p_id: $p_id, useful: $useful) {
      result
    }
  }
`;
