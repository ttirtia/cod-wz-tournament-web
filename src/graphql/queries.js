import gql from "graphql-tag";

export const FIND_PLAYERS = gql`
  query findPlayers($filter: PlayerFilter) {
    findPlayers(filter: $filter) {
      id
      name
      user {
        username
      }
    }
  }
`;

export const FIND_USERS = gql`
  query {
    findUsers {
      id
      username
      isAdmin
      player {
        name
      }
    }
  }
`;

export const FIND_INVITATIONS = gql`
  query {
    findInvitations {
      id
      validUntil
      isAdmin
      player {
        name
      }
    }
  }
`;
