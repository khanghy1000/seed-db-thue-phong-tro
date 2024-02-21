-- DELELE ALL USER TABLES

DECLARE @Sql NVARCHAR(500) DECLARE @Cursor CURSOR

SET @Cursor = CURSOR FAST_FORWARD FOR
    SELECT DISTINCT sql = 'ALTER TABLE [' + tc2.TABLE_SCHEMA + '].[' + tc2.TABLE_NAME + '] DROP [' +
                          rc1.CONSTRAINT_NAME + '];'
    FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc1
             LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc2 ON tc2.CONSTRAINT_NAME = rc1.CONSTRAINT_NAME

OPEN @Cursor FETCH NEXT FROM @Cursor INTO @Sql

WHILE (@@FETCH_STATUS = 0)
    BEGIN
        EXEC sp_executesql @Sql
        FETCH NEXT FROM @Cursor INTO @Sql
    END

CLOSE @Cursor DEALLOCATE @Cursor
GO

EXEC sp_MSforeachtable 'DROP TABLE ?'
GO

-------------------------


CREATE TABLE role (
    ma_role  INT           NOT NULL IDENTITY (1, 1) PRIMARY KEY,
    ten_role NVARCHAR(100) NOT NULL,

    UNIQUE (ten_role)
)

INSERT INTO role (ten_role)
VALUES ('CHU_TRO'),
       ('NGUOI_TIM_PHONG'),
       ('ADMIN')

CREATE TABLE dang_nhap (
    username NVARCHAR(100) NOT NULL PRIMARY KEY,
    password NVARCHAR(255) NOT NULL,
    ma_role  INT           NOT NULL,

    FOREIGN KEY (ma_role) REFERENCES role (ma_role)
)

CREATE TABLE nguoi_tim_phong (
    ma_nguoi_tim_phong INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ho_dem             NVARCHAR(255) NOT NULL,
    ten                NVARCHAR(255) NOT NULL,
    so_can_cuoc        BIGINT        NOT NULL,
    gioi_tinh          NVARCHAR(4)   NOT NULL,
    ngay_sinh          DATE          NOT NULL,
    email              NVARCHAR(255) NOT NULL,
    so_dien_thoai      BIGINT        NOT NULL,
    username           NVARCHAR(100) NOT NULL,

    UNIQUE (so_can_cuoc),
    CHECK (gioi_tinh = N'Nam' OR gioi_tinh = N'Nữ' OR gioi_tinh = N'Khác'),

    FOREIGN KEY (username) REFERENCES dang_nhap (username)
)

CREATE TABLE chu_tro (
    ma_chu_tro    INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ho_dem        NVARCHAR(255) NOT NULL,
    ten           NVARCHAR(255) NOT NULL,
    so_can_cuoc   BIGINT        NOT NULL,
    gioi_tinh     NVARCHAR(4)   NOT NULL,
    ngay_sinh     DATE          NOT NULL,
    email         NVARCHAR(255) NOT NULL,
    so_dien_thoai BIGINT        NOT NULL,
    username      NVARCHAR(100) NOT NULL,

    UNIQUE (so_can_cuoc),
    CHECK (gioi_tinh = N'Nam' OR gioi_tinh = N'Nữ' OR gioi_tinh = N'Khác'),

    FOREIGN KEY (username) REFERENCES dang_nhap (username)
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
    ma_phong               INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_phong              NVARCHAR(255) NOT NULL,
    so_nha                 NVARCHAR(255) NOT NULL,
    ma_phuong_xa           INT           NOT NULL,
    so_luong_nguoi         INT           NOT NULL,
    dien_tich_phong        FLOAT         NOT NULL,
    gia_thue               FLOAT         NOT NULL,
    tinh_trang_phong       NVARCHAR(255) NOT NULL,
    ma_chu_tro             INT           NOT NULL,
    ma_nguoi_thue_hien_tai INT,
    trang_thai_an          BIT DEFAULT 0 NOT NULL,
    mo_ta_them             NVARCHAR(MAX),

    CHECK (so_luong_nguoi > 0),
    CHECK (dien_tich_phong > 0),
    CHECK (gia_thue > 0),

    FOREIGN KEY (ma_phuong_xa) REFERENCES phuong_xa (ma_phuong_xa),
    FOREIGN KEY (ma_chu_tro) REFERENCES chu_tro (ma_chu_tro),
    FOREIGN KEY (ma_nguoi_thue_hien_tai) REFERENCES nguoi_tim_phong (ma_nguoi_tim_phong)
)

CREATE TABLE dich_vu (
    ma_dich_vu  INT           NOT NULL IDENTITY (1,1) PRIMARY KEY,
    ten_dich_vu NVARCHAR(255) NOT NULL,

    UNIQUE (ten_dich_vu)
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

    UNIQUE (ten_thiet_bi)
)

CREATE TABLE ct_thiet_bi (
    ma_thiet_bi INT           NOT NULL,
    ma_phong    INT           NOT NULL,
    so_luong    INT           NOT NULL,
    tinh_trang  NVARCHAR(255) NOT NULL,

    CHECK (so_luong > 0),

    FOREIGN KEY (ma_thiet_bi) REFERENCES thiet_bi (ma_thiet_bi),
    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),

    PRIMARY KEY (ma_thiet_bi, ma_phong)
)

CREATE TABLE ct_yeu_cau_xem_phong (
    ma_phong           INT                        NOT NULL,
    ma_nguoi_tim_phong INT                        NOT NULL,
    ngay_gio_yeu_cau   DATETIME DEFAULT GETDATE() NOT NULL,
    ngay_gio_hen       DATETIME                   NOT NULL,
    trang_thai         NVARCHAR(10)               NOT NULL,
    ly_do_tu_choi      NVARCHAR(255),
    ngay_gio_tu_choi   DATETIME,

    CHECK (trang_thai = N'Chờ duyệt' OR trang_thai = N'Đồng ý' OR trang_thai = N'Từ chối' OR trang_thai = N'Huỷ'),
    CHECK (ngay_gio_yeu_cau < ngay_gio_hen),

    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),
    FOREIGN KEY (ma_nguoi_tim_phong) REFERENCES nguoi_tim_phong (ma_nguoi_tim_phong),

    PRIMARY KEY (ma_phong, ma_nguoi_tim_phong, ngay_gio_yeu_cau)
)

CREATE TABLE ct_yeu_cau_thue_phong (
    ma_phong           INT                        NOT NULL,
    ma_nguoi_tim_phong INT                        NOT NULL,
    ngay_gio_yeu_cau   DATETIME DEFAULT GETDATE() NOT NULL,
    trang_thai         NVARCHAR(10)               NOT NULL,
    ly_do_tu_choi      NVARCHAR(255),
    ngay_gio_tu_choi   DATETIME,

    CHECK (trang_thai = N'Chờ duyệt' OR trang_thai = N'Đồng ý' OR trang_thai = N'Từ chối' OR trang_thai = N'Huỷ'),

    FOREIGN KEY (ma_phong) REFERENCES phong (ma_phong),
    FOREIGN KEY (ma_nguoi_tim_phong) REFERENCES nguoi_tim_phong (ma_nguoi_tim_phong),

    PRIMARY KEY (ma_phong, ma_nguoi_tim_phong, ngay_gio_yeu_cau)
)