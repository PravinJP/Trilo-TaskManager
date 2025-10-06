package com.project.Trilio_TaskManager.teams.Repository;

import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.teams.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    List<Invitation> findByInvitee(User invitee);
}
