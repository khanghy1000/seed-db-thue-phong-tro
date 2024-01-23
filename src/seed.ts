import { PrismaClient, ct_thue_phong } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedNguoiTimPhong = async () => {
    let result = Array.from(Array(50)).map((_) => {
        return {
            ho_dem: faker.person.lastName(),
            ten: faker.person.firstName(),
            so_can_cuoc: faker.number.int({
                min: 10 ^ 11,
                max: 999_999_999_999,
            }),
            gioi_tinh: ['Nam', 'Nữ', 'Khác'][Math.floor(Math.random() * 3)],
            ngay_sinh: faker.date.birthdate(),
            email: faker.internet.email(),
            so_dien_thoai: faker.number.int({
                min: 10 ^ 9,
                max: 9_999_999_999,
            }),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.so_can_cuoc == item.so_can_cuoc) == pos
        );
    });

    await prisma.nguoi_tim_phong.createMany({ data: result });
};

const seedChuPhong = async () => {
    let result = Array.from(Array(10)).map((_) => {
        return {
            ho_dem: faker.person.lastName(),
            ten: faker.person.firstName(),
            so_can_cuoc: faker.number.int({
                min: 10 ^ 11,
                max: 999_999_999_999,
            }),
            gioi_tinh: ['Nam', 'Nữ', 'Khác'][Math.floor(Math.random() * 3)],
            ngay_sinh: faker.date.birthdate(),
            email: faker.internet.email(),
            so_dien_thoai: faker.number.int({
                min: 10 ^ 9,
                max: 9_999_999_999,
            }),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.so_can_cuoc == item.so_can_cuoc) == pos
        );
    });

    await prisma.chu_phong.createMany({ data: result });
};

const seedTinh = async () => {
    let result = Array.from(Array(10)).map((_) => {
        return {
            ten_tinh: faker.location.state(),
        };
    });

    result = result.filter((item, pos) => {
        return result.findIndex((e) => e.ten_tinh == item.ten_tinh) == pos;
    });

    await prisma.tinh.createMany({ data: result });
};

const seedQuanHuyen = async () => {
    const tinh = await prisma.tinh.findMany();

    let result = Array.from(Array(30)).map((_) => {
        return {
            ten_quan_huyen: faker.location.city(),
            ma_tinh: tinh[Math.floor(Math.random() * tinh.length)].ma_tinh,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ten_quan_huyen == item.ten_quan_huyen &&
                    e.ma_tinh == item.ma_tinh
            ) == pos
        );
    });

    await prisma.quan_huyen.createMany({ data: result });
};

const seedPhuongXa = async () => {
    const quanHuyen = await prisma.quan_huyen.findMany();

    let result = Array.from(Array(70)).map((_) => {
        return {
            ten_phuong_xa: faker.lorem.words(2),
            ma_quan_huyen:
                quanHuyen[Math.floor(Math.random() * quanHuyen.length)]
                    .ma_quan_huyen,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_quan_huyen == item.ma_quan_huyen &&
                    e.ten_phuong_xa == e.ten_phuong_xa
            ) == pos
        );
    });

    await prisma.phuong_xa.createMany({ data: result });
};

const seedPhong = async () => {
    const chuPhong = await prisma.chu_phong.findMany();
    const phuongXa = await prisma.phuong_xa.findMany();

    const result = Array.from(Array(70)).map((_) => {
        return {
            ten_phong: faker.lorem.words(2),
            so_nha: faker.location.streetAddress(),
            ma_phuong_xa:
                phuongXa[Math.floor(Math.random() * phuongXa.length)]
                    .ma_phuong_xa,
            so_luong_nguoi: Math.floor(Math.random() * 9) + 1,
            dien_tich_phong: Math.floor(Math.random() * 300) + 20,
            gia_thue: Math.floor(Math.random() * 20_000_000) + 500_000,
            mo_ta_them: faker.lorem.words(100),
            ma_chu_phong:
                chuPhong[Math.floor(Math.random() * chuPhong.length)]
                    .ma_chu_phong,
        };
    });

    await prisma.phong.createMany({ data: result });
};

const seedDichVu = async () => {
    let result = Array.from(Array(300)).map((_) => {
        return {
            ten_dich_vu: faker.lorem.words(2),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.ten_dich_vu == item.ten_dich_vu) == pos
        );
    });

    await prisma.dich_vu.createMany({ data: result });
};

const seedCtDichVu = async () => {
    let phong = await prisma.phong.findMany();
    let dichVu = await prisma.dich_vu.findMany();

    let result = Array.from(Array(300)).map((_) => {
        return {
            gia: Math.floor(Math.random() * 1_000_000) + 10_000,
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_dich_vu:
                dichVu[Math.floor(Math.random() * dichVu.length)].ma_dich_vu,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_dich_vu == item.ma_dich_vu &&
                    e.ma_phong == item.ma_phong
            ) == pos
        );
    });

    await prisma.ct_dich_vu.createMany({
        data: result,
    });
};

const seedThietBi = async () => {
    let result = Array.from(Array(300)).map((_) => {
        return {
            ten_thiet_bi: faker.lorem.words(2),
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex((e) => e.ten_thiet_bi == item.ten_thiet_bi) == pos
        );
    });

    await prisma.thiet_bi.createMany({ data: result });
};

const seedCtThietBi = async () => {
    let phong = await prisma.phong.findMany();
    let thietBi = await prisma.thiet_bi.findMany();

    let result = Array.from(Array(300)).map((_) => {
        return {
            ma_thiet_bi:
                thietBi[Math.floor(Math.random() * thietBi.length)].ma_thiet_bi,
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            so_luong: Math.floor(Math.random() * 10) + 1,
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_phong == item.ma_phong &&
                    e.ma_thiet_bi == item.ma_thiet_bi
            ) == pos
        );
    });

    await prisma.ct_thiet_bi.createMany({
        data: result,
    });
};

const seedYeuCauXem = async () => {
    const phong = await prisma.phong.findMany();
    const nguoiTimPhong = await prisma.nguoi_tim_phong.findMany();

    let result = Array.from(Array(100)).map((_) => {
        return {
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_nguoi_tim_phong:
                nguoiTimPhong[Math.floor(Math.random() * nguoiTimPhong.length)]
                    .ma_nguoi_tim_phong,
            ngay_gio_yeu_cau: faker.date.recent(),
            ngay_gio_hen: faker.date.soon(),
            trang_thai: ['Chờ duyệt', 'Đồng ý', 'Từ chối'][
                Math.floor(Math.random() * 3)
            ],
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_nguoi_tim_phong == item.ma_nguoi_tim_phong &&
                    e.ma_phong == item.ma_phong &&
                    e.ngay_gio_yeu_cau == item.ngay_gio_yeu_cau
            ) == pos
        );
    });

    await prisma.ct_xem_phong.createMany({ data: result });
};

const seedCtThuePhong = async () => {
    const phong = await prisma.phong.findMany();
    const nguoiTimPhong = await prisma.nguoi_tim_phong.findMany();

    let result = Array.from(Array(100)).map((_) => {
        return {
            ma_phong: phong[Math.floor(Math.random() * phong.length)].ma_phong,
            ma_nguoi_tim_phong:
                nguoiTimPhong[Math.floor(Math.random() * nguoiTimPhong.length)]
                    .ma_nguoi_tim_phong,
            ngay_gio_yeu_cau: faker.date.recent(),
            trang_thai: ['Chờ duyệt', 'Đồng ý', 'Từ chối'][
                Math.floor(Math.random() * 3)
            ],
        };
    });

    result = result.filter((item, pos) => {
        return (
            result.findIndex(
                (e) =>
                    e.ma_nguoi_tim_phong == item.ma_nguoi_tim_phong &&
                    e.ma_phong == item.ma_phong &&
                    e.ngay_gio_yeu_cau == item.ngay_gio_yeu_cau
            ) == pos
        );
    });

    result = result.filter((item, pos) => {
        if (item.trang_thai != 'Đồng ý') return true;

        return result.findIndex((e) => e.ma_phong == item.ma_phong) == pos;
    });

    await prisma.ct_thue_phong.createMany({
        data: result,
    });
};

const seed = async () => {
    await prisma.ct_thue_phong.deleteMany();
    await prisma.ct_xem_phong.deleteMany();
    await prisma.ct_thiet_bi.deleteMany();
    await prisma.thiet_bi.deleteMany();
    await prisma.ct_dich_vu.deleteMany();
    await prisma.dich_vu.deleteMany();
    await prisma.phong.deleteMany();
    await prisma.phuong_xa.deleteMany();
    await prisma.quan_huyen.deleteMany();
    await prisma.tinh.deleteMany();
    await prisma.chu_phong.deleteMany();
    await prisma.nguoi_tim_phong.deleteMany();

    await seedTinh();
    await seedChuPhong();
    await seedNguoiTimPhong();
    await seedQuanHuyen();
    await seedPhuongXa();
    await seedPhong();
    await seedDichVu();
    await seedCtDichVu();
    await seedThietBi();
    await seedCtThietBi();
    await seedYeuCauXem();
    await seedCtThuePhong();
};

seed().then(() => {
    console.log('Done');
});
