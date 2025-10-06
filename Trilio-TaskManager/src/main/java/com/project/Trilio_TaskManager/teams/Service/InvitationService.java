package com.project.Trilio_TaskManager.teams.Service;

import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.teams.Repository.InvitationRepository;
import com.project.Trilio_TaskManager.teams.Repository.TeamRepository;
import com.project.Trilio_TaskManager.teams.model.Invitation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvitationService {

    private final InvitationRepository invitationRepo;
    private final TeamRepository teamRepo;

    public InvitationService(InvitationRepository invitationRepo, TeamRepository teamRepo) {
        this.invitationRepo = invitationRepo;
        this.teamRepo = teamRepo;
    }

    public List<Invitation> getInvitations(User user) {
        return invitationRepo.findByInvitee(user);
    }

    public void respondToInvitation(Long id, String action, User user) {
        Invitation invite = invitationRepo.findById(id).orElseThrow();

        if (!invite.getInvitee().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized for this invitation");
        }

        if ("accept".equalsIgnoreCase(action)) {
            invite.setStatus("accepted");
            var team = invite.getTeam();
            team.getMembers().add(user);
            teamRepo.save(team);
        } else {
            invite.setStatus("rejected");
        }

        invitationRepo.save(invite);
    }
}