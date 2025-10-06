package com.project.Trilio_TaskManager.Task.Controller;

import com.project.Trilio_TaskManager.Task.DTO.TaskRequest;
import com.project.Trilio_TaskManager.Task.Model.Task;
import com.project.Trilio_TaskManager.Task.Repository.TaskRepository;
import com.project.Trilio_TaskManager.Task.Service.TaskService;
import com.project.Trilio_TaskManager.auth.Model.User;
import com.project.Trilio_TaskManager.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    // Create task
    @PostMapping("/create-task")

    public ResponseEntity<?> createTask(@RequestBody Task request) {
        try {
            // 🔹 Fetch the assigned user and creator using IDs
            User assignedTo = userRepository.findById(request.getAssignedTo().getId())
                    .orElseThrow(() -> new RuntimeException("Assigned user not found"));

            User createdBy = userRepository.findById(request.getCreatedBy().getId())
                    .orElseThrow(() -> new RuntimeException("Created user not found"));

            // 🔹 Build and save the Task
            Task task = new Task();
            task.setTitle(request.getTitle());
            task.setDescription(request.getDescription());
            task.setStatus(request.getStatus());
            task.setPriority(request.getPriority());
            task.setAssignedTo(assignedTo);
            task.setCreatedBy(createdBy);
            task.setCreatedAt(LocalDateTime.now());
            task.setUpdatedAt(LocalDateTime.now());

            Task savedTask = taskRepository.save(task);

            return ResponseEntity.ok(savedTask);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get all tasks
    @GetMapping("/all-tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // Update task
    @PutMapping ("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(id, request));
    }

    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }
}
