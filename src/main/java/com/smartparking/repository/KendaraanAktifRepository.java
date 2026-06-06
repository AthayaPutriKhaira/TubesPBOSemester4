package com.smartparking.repository;

import com.smartparking.model.entity.KendaraanAktif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KendaraanAktifRepository extends JpaRepository<KendaraanAktif, Long> {
    Optional<KendaraanAktif> findByPlatNomor(String platNomor);
    boolean existsByPlatNomor(String platNomor);
}
