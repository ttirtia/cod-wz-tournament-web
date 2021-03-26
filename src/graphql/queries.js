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

export const FIND_TOURNAMENTS = gql`
  query findTournaments($filter: TournamentFilter, $teamOrder: TeamOrder) {
    findTournaments(filter: $filter, teamOrder: $teamOrder) {
      id
      name
      startDate
      endDate
      gameLimit
      isOpen
      teams {
        id
        name
        placement
        points
        players {
          id
          name
        }
        teamLeader {
          id
        }
      }
    }
  }
`;

export const FIND_TEAMS = gql`
  query findTeams($filter: TeamFilter) {
    findTeams(filter: $filter) {
      id
      name
      teamLeader {
        id
        name
      }
      players {
        id
        name
      }
      games {
        id
        placement
        points
        results {
          id
          kills
          player {
            id
            name
          }
        }
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
