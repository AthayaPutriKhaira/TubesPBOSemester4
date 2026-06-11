package com.smartparking.service;

import com.smartparking.dto.request.LoginRequest;
import com.smartparking.dto.response.LoginResponse;
import com.smartparking.model.entity.User;
import com.smartparking.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Username tidak ditemukan"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Password salah");
        }

        return new LoginResponse(user.getId(), user.getUsername(), user.getRole(), user.getNama());
    }
}
