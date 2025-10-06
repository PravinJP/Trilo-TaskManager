package com.project.Trilio_TaskManager.teams.Repository;

import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.teams.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findByOwner(User owner);
    List<Team> findByMembersContaining(User user);
}
