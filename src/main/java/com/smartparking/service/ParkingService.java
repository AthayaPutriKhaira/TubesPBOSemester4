package com.smartparking.service;

import com.smartparking.dto.request.ParkingKeluarRequest;
import com.smartparking.dto.request.ParkingMasukRequest;
import com.smartparking.dto.response.DashboardResponse;
import com.smartparking.dto.response.KendaraanAktifResponse;
import com.smartparking.dto.response.RiwayatResponse;
import com.smartparking.dto.response.StrukResponse;
import com.smartparking.model.entity.KendaraanAktif;

import java.util.List;

public interface ParkingService {
    DashboardResponse getDashboard();
    KendaraanAktifResponse parkingMasuk(ParkingMasukRequest req);
    List<KendaraanAktifResponse> getKendaraanAktif();
    StrukResponse parkingKeluar(ParkingKeluarRequest req);
    RiwayatResponse getRiwayat(String tanggal, String jenis, String platNomor);
    byte[] exportCsv();
}
