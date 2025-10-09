package com.project.Trilio_TaskManager.auth.Service;

import com.project.Trilio_TaskManager.auth.DTO.PasswordResetRequest;
import com.project.Trilio_TaskManager.auth.DTO.SignupRequest;
import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Error: Email is already in use!";
        }
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Error: Passwords do not match!";
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    public void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}