import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser($invitationId: ID!, $user: CreateUserInput!) {
    createUser(invitationId: $invitationId, user: $user) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const CREATE_PLAYER = gql`
  mutation createPlayer($name: String!) {
    createPlayer(player: { name: $name }) {
      id
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation deletePlayer($id: ID!) {
    deletePlayer(id: $id)
  }
`;

export const CREATE_TOURNAMENT = gql`
  mutation createTournament($tournament: CreateTournamentInput!) {
    createTournament(tournament: $tournament) {
      id
    }
  }
`;

export const UPDATE_TOURNAMENT = gql`
  mutation updateTournament($id: ID!, $tournament: UpdateTournamentInput!) {
    updateTournament(id: $id, tournament: $tournament) {
      id
    }
  }
`;

export const DELETE_TOURNAMENT = gql`
  mutation deleteTournament($id: ID!) {
    deleteTournament(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      id
    }
  }
`;

export const CREATE_INVITATION = gql`
  mutation createInvitation($player: ID!, $isAdmin: Boolean) {
    createInvitation(invitation: { player: $player, isAdmin: $isAdmin }) {
      id
    }
  }
`;

export const DELETE_INVITATION = gql`
  mutation deleteInvitation($id: ID!) {
    deleteInvitation(id: $id)
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($team: CreateTeamInput!) {
    createTeam(team: $team) {
      id
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation updateTeam($id: ID!, $team: UpdateTeamInput!) {
    updateTeam(id: $id, team: $team) {
      id
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation deleteTeam($id: ID!) {
    deleteTeam(id: $id)
  }
`;

export const CREATE_GAME = gql`
  mutation createGame($game: CreateGameInput!) {
    createGame(game: $game) {
      id
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame($id: ID!, $game: UpdateGameInput!) {
    updateGame(id: $id, game: $game) {
      id
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id)
  }
`;
