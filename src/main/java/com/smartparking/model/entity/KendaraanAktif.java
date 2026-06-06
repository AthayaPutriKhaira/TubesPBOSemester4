package com.smartparking.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "kendaraan_aktif")
public class KendaraanAktif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String platNomor;

    @Column(nullable = false, length = 10)
    private String jenis;

    @Column(nullable = false)
    private LocalDateTime waktuMasuk;

    public KendaraanAktif() {
    }

    public KendaraanAktif(String platNomor, String jenis, LocalDateTime waktuMasuk) {
        this.platNomor = platNomor;
        this.jenis = jenis;
        this.waktuMasuk = waktuMasuk;
    }

    public long getDurasiMenit() {
        if (waktuMasuk == null) return 0;
        return ChronoUnit.MINUTES.between(waktuMasuk, LocalDateTime.now());
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlatNomor() {
        return platNomor;
    }

    public void setPlatNomor(String platNomor) {
        this.platNomor = platNomor;
    }

    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public LocalDateTime getWaktuMasuk() {
        return waktuMasuk;
    }

    public void setWaktuMasuk(LocalDateTime waktuMasuk) {
        this.waktuMasuk = waktuMasuk;
    }
}
