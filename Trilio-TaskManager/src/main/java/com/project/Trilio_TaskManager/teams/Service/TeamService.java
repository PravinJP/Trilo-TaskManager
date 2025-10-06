package com.project.Trilio_TaskManager.teams.Service;

import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.auth.repository.UserRepository;
import com.project.Trilio_TaskManager.teams.Repository.InvitationRepository;
import com.project.Trilio_TaskManager.teams.Repository.TeamRepository;
import com.project.Trilio_TaskManager.teams.model.Invitation;
import com.project.Trilio_TaskManager.teams.model.Team;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final TeamRepository teamRepo;
    private final InvitationRepository invitationRepo;
    private final UserRepository userRepo;

    public TeamService(TeamRepository teamRepo, InvitationRepository invitationRepo, UserRepository userRepo) {
        this.teamRepo = teamRepo;
        this.invitationRepo = invitationRepo;
        this.userRepo = userRepo;
    }

    public Team createTeam(String name, User owner) {
        Team team = new Team(name, owner);
        teamRepo.save(team);
        return team;
    }

    public List<Team> getOwnedTeams(User owner) {
        return teamRepo.findByOwner(owner);
    }

    public List<Team> getJoinedTeams(User user) {
        return teamRepo.findByMembersContaining(user);
    }

    public Invitation inviteMember(Long teamId, Long inviteeId, User invitedBy) {
        Team team = teamRepo.findById(teamId).orElseThrow();
        User invitee = userRepo.findById(inviteeId).orElseThrow();
        Invitation invite = new Invitation();
        invite.setTeam(team);
        invite.setInvitedBy(invitedBy);
        invite.setInvitee(invitee);
        invite.setStatus("pending");
        invitationRepo.save(invite);
        return invite;
    }

    public void removeMember(Long teamId, Long memberId) {
        Team team = teamRepo.findById(teamId).orElseThrow();
        User member = userRepo.findById(memberId).orElseThrow();
        team.getMembers().remove(member);
        teamRepo.save(team);
    }
}
