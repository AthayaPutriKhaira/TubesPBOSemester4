package com.smartparking.dto.response;

public class KendaraanAktifResponse {
    private Long id;
    private String platNomor;
    private String jenis;
    private String waktuMasuk;
    private long durasiMenit;

    public KendaraanAktifResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPlatNomor() { return platNomor; }
    public void setPlatNomor(String platNomor) { this.platNomor = platNomor; }

    public String getJenis() { return jenis; }
    public void setJenis(String jenis) { this.jenis = jenis; }

    public String getWaktuMasuk() { return waktuMasuk; }
    public void setWaktuMasuk(String waktuMasuk) { this.waktuMasuk = waktuMasuk; }

    public long getDurasiMenit() { return durasiMenit; }
    public void setDurasiMenit(long durasiMenit) { this.durasiMenit = durasiMenit; }
}
