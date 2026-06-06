package com.smartparking.model.domain;

import com.smartparking.config.TarifConfig;
import java.time.LocalDateTime;

/**
 * Mobil MEWARISI platNomor, waktuMasuk, hitungDurasiMenit(), hitungLamaJam()
 * dari parent class Kendaraan tanpa menulis ulang
 */
public class Mobil extends Kendaraan {
    public Mobil(String platNomor, LocalDateTime waktuMasuk) {
        super(platNomor, waktuMasuk);
    }

    @Override
    public String getJenis() {
        return "Mobil";
    }

    @Override
    public int getTarifPerJam() {
        return TarifConfig.TARIF_MOBIL;
    }

    @Override
    public int hitungTarif(int durasiMenit) {
        int jam = (int) Math.ceil(durasiMenit / 60.0);
        return Math.max(1, jam) * TarifConfig.TARIF_MOBIL; // minimum 1 jam
    }
}
