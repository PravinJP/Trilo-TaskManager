import api from "./api";

const teamService = {
  async createTeam(data) {
    const res = await api.post("/v1/teams/create", data);
    return res.data.data.team;
  },

  async getOwnedTeams() {
    const res = await api.get("/v1/teams/owned");
    return res.data.data.teams || [];
  },

  async getJoinedTeams() {
    const res = await api.get("/v1/teams/joined");
    return res.data.data.teams || [];
  },

  async getInvitations() {
    const res = await api.get("/v1/teams/invitations");
    return res.data.data.invitations || [];
  },
};

export default teamService;
