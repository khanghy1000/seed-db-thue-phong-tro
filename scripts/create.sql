DROP TABLE IF EXISTS ct_thue_phong;
DROP TABLE IF EXISTS yeu_cau_xem_phong;
DROP TABLE IF EXISTS ct_xem_phong;
DROP TABLE IF EXISTS ct_thiet_bi;
DROP TABLE IF EXISTS thiet_bi;
DROP TABLE IF EXISTS ct_dich_vu;
DROP TABLE IF EXISTS dich_vu;
DROP TABLE IF EXISTS phong;
DROP TABLE IF EXISTS phuong_xa;
DROP TABLE IF EXISTS quan_huyen;
DROP TABLE IF EXISTS tinh;
DROP TABLE IF EXISTS chu_phong;
DROP TABLE IF EXISTS nguoi_tim_phong;
DROP TABLE IF EXISTS nguoi_thue;


CREATE TABLE nguoi_tim_phong (
    ma_nguoi_tim_phong INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ho_dem             NVARCHAR(255) NOT NULL,
    ten                NVARCHAR(255) NOT NULL,
    so_can_cuoc        BIGINT        NOT NULL,
    gioi_tinh          NVARCHAR(4)   NOT NULL,
    ngay_sinh          DATE          NOT NULL,
    email              NVARCHAR(255) NOT NULL,
    so_dien_thoai      BIGINT        NOT NULL,

    UNIQUE (so_can_cuoc),
    CHECK (gioi_tinh = N'Nam' OR gioi_tinh = N'Nữ' OR gioi_tinh = N'Khác')
)

CREATE TABLE chu_phong (
    ma_chu_phong  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ho_dem        NVARCHAR(255) NOT NULL,
    ten           NVARCHAR(255) NOT NULL,
    so_can_cuoc   BIGINT        NOT NULL,
    gioi_tinh     NVARCHAR(4)   NOT NULL,
    ngay_sinh     DATE          NOT NULL,
    email         NVARCHAR(255) NOT NULL,
    so_dien_thoai BIGINT        NOT NULL,

    UNIQUE (so_can_cuoc),
    CHECK (gioi_tinh = N'Nam' OR gioi_tinh = N'Nữ' OR gioi_tinh = N'Khác')
)

CREATE TABLE tinh (
    ma_tinh  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_tinh NVARCHAR(255) NOT NULL,

    UNIQUE (ten_tinh)
)

CREATE TABLE quan_huyen (
    ma_quan_huyen  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_quan_huyen NVARCHAR(255) NOT NULL,
    ma_tinh        INT           NOT NULL,

    UNIQUE (ten_quan_huyen, ma_tinh),

    FOREIGN KEY (ma_tinh) REFERENCES tinh (ma_tinh)
)

CREATE TABLE phuong_xa (
    ma_phuong_xa  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_phuong_xa NVARCHAR(255) NOT NULL,
    ma_quan_huyen INT           NOT NULL,

    UNIQUE (ten_phuong_xa, ma_quan_huyen),

    FOREIGN KEY (ma_quan_huyen) REFERENCES quan_huyen (ma_quan_huyen)
)

CREATE TABLE phong (
    ma_phong        INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_phong       NVARCHAR(255) NOT NULL,
    so_nha          NVARCHAR(255) NOT NULL,
    ma_phuong_xa    INT           NOT NULL,
    so_luong_nguoi  INT           NOT NULL,
    dien_tich_phong FLOAT         NOT NULL,
    gia_thue        FLOAT         NOT NULL,
    ma_chu_phong    INT           NOT NULL,
    mo_ta_them      NVARCHAR(max),

    CHECK (so_luong_nguoi > 0),
    CHECK (dien_tich_phong > 0),
    CHECK (gia_thue > 0),

    FOREIGN KEY (ma_phuong_xa) REFERENCES phuong_xa (ma_phuong_xa),
    FOREIGN KEY (ma_chu_phong) REFERENCES chu_phong (ma_chu_phong),
)

CREATE TABLE dich_vu (
    ma_dich_vu  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_dich_vu NVARCHAR(255) NOT NULL,

    UNIQUE(ten_dich_vu)
)

CREATE TABLE ct_dich_vu (
    ma_dich_vu INT NOT NULL,
    ma_phong   INT NOT NULL,
    gia        INT NOT NULL,
    CHECK (gia > 0),

    FOREIGN KEY (ma_dich_vu) REFERENCES dich_vu (ma_dich_vu),
    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),

    PRIMARY KEY (ma_dich_vu, ma_phong)
)

CREATE TABLE thiet_bi (
    ma_thiet_bi  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_thiet_bi NVARCHAR(255) NOT NULL,

    UNIQUE(ten_thiet_bi)
)

CREATE TABLE ct_thiet_bi (
    ma_thiet_bi INT NOT NULL,
    ma_phong    INT NOT NULL,
    so_luong    INT NOT NULL,

    CHECK (so_luong > 0),

    FOREIGN KEY (ma_thiet_bi) REFERENCES thiet_bi (ma_thiet_bi),
    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),

    PRIMARY KEY (ma_thiet_bi, ma_phong)
)

CREATE TABLE ct_xem_phong (
    ma_phong           INT          NOT NULL,
    ma_nguoi_tim_phong INT          NOT NULL,
    ngay_gio_yeu_cau   DATETIME     NOT NULL,
    ngay_gio_hen       DATETIME     NOT NULL,
    trang_thai         NVARCHAR(10) NOT NULL,

    CHECK (trang_thai = N'Chờ duyệt' OR trang_thai = N'Đồng ý' OR trang_thai = N'Từ chối'),
    CHECK (ngay_gio_yeu_cau < ngay_gio_hen),

    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),
    FOREIGN KEY (ma_nguoi_tim_phong) REFERENCES nguoi_tim_phong (ma_nguoi_tim_phong),

    PRIMARY KEY (ma_phong, ma_nguoi_tim_phong, ngay_gio_yeu_cau)
)

CREATE TABLE ct_thue_phong (
    ma_phong           INT          NOT NULL,
    ma_nguoi_tim_phong INT          NOT NULL,
    ngay_gio_yeu_cau   DATETIME     NOT NULL,
    trang_thai         NVARCHAR(10) NOT NULL,

    CHECK (trang_thai = N'Chờ duyệt' OR trang_thai = N'Đồng ý' OR trang_thai = N'Từ chối'),

    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),
    FOREIGN KEY (ma_nguoi_tim_phong) REFERENCES nguoi_tim_phong (ma_nguoi_tim_phong),

    PRIMARY KEY (ma_phong, ma_nguoi_tim_phong, ngay_gio_yeu_cau)
)