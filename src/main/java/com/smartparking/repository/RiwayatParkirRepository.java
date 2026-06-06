package com.smartparking.repository;

import com.smartparking.model.entity.RiwayatParkir;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiwayatParkirRepository extends JpaRepository<RiwayatParkir, Long> {
}
