package com.smartparking.model.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "riwayat_parkir")
public class RiwayatParkir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String platNomor;

    @Column(nullable = false, length = 10)
    private String jenis;

    @Column(nullable = false)
    private LocalDateTime waktuMasuk;

    @Column(nullable = false)
    private LocalDateTime waktuKeluar;

    @Column(nullable = false)
    private int durasiMenit;

    @Column(nullable = false)
    private int tarifPerJam;

    @Column(nullable = false)
    private int lamaJam;

    @Column(nullable = false)
    private int totalBayar;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public RiwayatParkir() {
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

    public LocalDateTime getWaktuKeluar() {
        return waktuKeluar;
    }

    public void setWaktuKeluar(LocalDateTime waktuKeluar) {
        this.waktuKeluar = waktuKeluar;
    }

    public int getDurasiMenit() {
        return durasiMenit;
    }

    public void setDurasiMenit(int durasiMenit) {
        this.durasiMenit = durasiMenit;
    }

    public int getTarifPerJam() {
        return tarifPerJam;
    }

    public void setTarifPerJam(int tarifPerJam) {
        this.tarifPerJam = tarifPerJam;
    }

    public int getLamaJam() {
        return lamaJam;
    }

    public void setLamaJam(int lamaJam) {
        this.lamaJam = lamaJam;
    }

    public int getTotalBayar() {
        return totalBayar;
    }

    public void setTotalBayar(int totalBayar) {
        this.totalBayar = totalBayar;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
