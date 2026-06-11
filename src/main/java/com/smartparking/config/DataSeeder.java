package com.smartparking.config;

import com.smartparking.model.entity.User;
import com.smartparking.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        // Seed default admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", "admin123", "ADMIN", "Administrator");
            userRepository.save(admin);
            System.out.println("✅ Default admin user created (admin/admin123)");
        }

        // Seed default petugas user
        if (!userRepository.existsByUsername("petugas")) {
            User petugas = new User("petugas", "petugas123", "PETUGAS", "Petugas Parkir");
            userRepository.save(petugas);
            System.out.println("✅ Default petugas user created (petugas/petugas123)");
        }
    }
}
