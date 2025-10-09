import { useEffect, useState } from "react";
import teamService from "../services/teamService";

export const useTeams = () => {
  const [ownedTeams, setOwnedTeams] = useState([]);
  const [joinedTeams, setJoinedTeams] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTeamsData = async () => {
    try {
      const [owned, joined, invites] = await Promise.all([
        teamService.getOwnedTeams(),
        teamService.getJoinedTeams(),
        teamService.getInvitations(),
      ]);
      setOwnedTeams(owned);
      setJoinedTeams(joined);
      setInvitations(invites);
    } catch (error) {
      console.error("Failed to load teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamsData();
  }, []);

  const createTeam = async (name) => {
    try {
      const newTeam = await teamService.createTeam({ name });
      setOwnedTeams((prev) => [...prev, newTeam]);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return { ownedTeams, joinedTeams, invitations, loading, createTeam };
};
