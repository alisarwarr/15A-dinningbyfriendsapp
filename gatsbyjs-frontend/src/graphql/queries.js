/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allUsers = /* GraphQL */ `
  query AllUsers {
    allUsers {
      id
      name
    }
  }
`;
export const getUserByName = /* GraphQL */ `
  query GetUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
    }
  }
`;
export const allRestaurants = /* GraphQL */ `
  query AllRestaurants {
    allRestaurants {
      id
      name
      cuisine
      address
    }
  }
`;
export const getRestaurantByName = /* GraphQL */ `
  query GetRestaurantByName($name: String!) {
    getRestaurantByName(name: $name) {
      id
      name
      cuisine
      address
    }
  }
`;
export const allUserfriends = /* GraphQL */ `
  query AllUserfriends($id: ID!) {
    allUserfriends(id: $id) {
      id
      name
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const getUserfriendById = /* GraphQL */ `
  query GetUserfriendById($idFrom: ID!, $idTo: ID!) {
    getUserfriendById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const allUserrestaurants = /* GraphQL */ `
  query AllUserrestaurants($id: ID!) {
    allUserrestaurants(id: $id) {
      id
      name
      cuisine
      address
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const getUserrestaurantById = /* GraphQL */ `
  query GetUserrestaurantById($idFrom: ID!, $idTo: ID!) {
    getUserrestaurantById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
      cuisine
      address
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const allRestaurantusers = /* GraphQL */ `
  query AllRestaurantusers($id: ID!) {
    allRestaurantusers(id: $id) {
      id
      name
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const getRestaurantuserById = /* GraphQL */ `
  query GetRestaurantuserById($idFrom: ID!, $idTo: ID!) {
    getRestaurantuserById(idFrom: $idFrom, idTo: $idTo) {
      id
      name
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const allRestaurantuserreviews = /* GraphQL */ `
  query AllRestaurantuserreviews($id: ID!) {
    allRestaurantuserreviews(id: $id) {
      r_id
      r_restaurantId_ExistInRestaurantsVertex
      r_userId_ExistInUsersVertex
      r_userName_ExistInUsersVertex
      r_text
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const getRestaurantuserreviewByUserId = /* GraphQL */ `
  query GetRestaurantuserreviewByUserId($idFrom: ID!, $idTo: ID!) {
    getRestaurantuserreviewByUserId(idFrom: $idFrom, idTo: $idTo) {
      r_id
      r_restaurantId_ExistInRestaurantsVertex
      r_userId_ExistInUsersVertex
      r_userName_ExistInUsersVertex
      r_text
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const allRestaurantuserreviewpersonalizations = /* GraphQL */ `
  query AllRestaurantuserreviewpersonalizations($id: ID!, $hisId: ID!) {
    allRestaurantuserreviewpersonalizations(id: $id, hisId: $hisId) {
      p_id
      p_restaurantId_ExistInRestaurantsVertex
      p_reviewId_ExistInReviewsVertex
      p_userId_ExistInUsersVertex
      p_userName_ExistInUsersVertex
      p_useful
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const getRestaurantuserreviewpersonalizationByUserId = /* GraphQL */ `
  query GetRestaurantuserreviewpersonalizationByUserId(
    $idFrom: ID!
    $idTo: ID!
    $hisId: ID!
  ) {
    getRestaurantuserreviewpersonalizationByUserId(
      idFrom: $idFrom
      idTo: $idTo
      hisId: $hisId
    ) {
      p_id
      p_restaurantId_ExistInRestaurantsVertex
      p_reviewId_ExistInReviewsVertex
      p_userId_ExistInUsersVertex
      p_userName_ExistInUsersVertex
      p_useful
      edge_id
      edge_label
      edge_outV_id
      edge_inV_id
    }
  }
`;
export const all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId = /* GraphQL */ `
  query All_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(
    $id: ID!
    $hisId: ID!
  ) {
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(
      id: $id
      hisId: $hisId
    ) {
      _review {
        r_id
        r_restaurantId_ExistInRestaurantsVertex
        r_userId_ExistInUsersVertex
        r_userName_ExistInUsersVertex
        r_text
        edge_id
        edge_label
        edge_outV_id
        edge_inV_id
      }
      _personalization {
        p_id
        p_restaurantId_ExistInRestaurantsVertex
        p_reviewId_ExistInReviewsVertex
        p_userId_ExistInUsersVertex
        p_userName_ExistInUsersVertex
        p_useful
        edge_id
        edge_label
        edge_outV_id
        edge_inV_id
      }
    }
  }
`;
export const all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId = /* GraphQL */ `
  query All_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
    $id: ID!
    $hisId: ID!
  ) {
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(
      id: $id
      hisId: $hisId
    ) {
      _review {
        r_id
        r_restaurantId_ExistInRestaurantsVertex
        r_userId_ExistInUsersVertex
        r_userName_ExistInUsersVertex
        r_text
        edge_id
        edge_label
        edge_outV_id
        edge_inV_id
      }
      _personalization {
        p_id
        p_restaurantId_ExistInRestaurantsVertex
        p_reviewId_ExistInReviewsVertex
        p_userId_ExistInUsersVertex
        p_userName_ExistInUsersVertex
        p_useful
        edge_id
        edge_label
        edge_outV_id
        edge_inV_id
      }
    }
  }
`;
